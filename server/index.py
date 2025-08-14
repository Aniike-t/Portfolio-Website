from flask import Flask, request, jsonify
import psycopg2
import os
import requests

app = Flask(__name__)

# Config
DB_URL = os.getenv("NEON_DB_URL")  # postgres://...
ADMIN_USER = os.getenv("ADMIN_USER", "admin")
ADMIN_PASS = os.getenv("ADMIN_PASS", "password")

# DB connect
conn = psycopg2.connect(DB_URL, sslmode="require")
cur = conn.cursor()

# Create tables if not exist
cur.execute("""
CREATE TABLE IF NOT EXISTS visits (
    id SERIAL PRIMARY KEY,
    ip TEXT,
    location TEXT,
    unique_id TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS counters (
    id SERIAL PRIMARY KEY,
    count BIGINT DEFAULT 0
);
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    ip TEXT,
    location TEXT,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO counters (count)
SELECT 0 WHERE NOT EXISTS (SELECT 1 FROM counters);
""")
conn.commit()

def get_location_from_ip(ip):
    try:
        if ip in ("127.0.0.1", "::1"):
            return "Localhost"
        res = requests.get(f"https://ipapi.co/{ip}/json/")
        if res.status_code == 200:
            data = res.json()
            return f"{data.get('city', 'Unknown')}, {data.get('region', '')}, {data.get('country_name', '')}"
    except:
        pass
    return "Unknown"

def check_admin(req):
    return (
        req.headers.get("auth_user") == ADMIN_USER
        and req.headers.get("auth_pass") == ADMIN_PASS
    )

@app.route("/count_visit")
def count_visit():
    cur.execute("UPDATE counters SET count = count + 1 RETURNING count;")
    conn.commit()
    return jsonify({"count": cur.fetchone()[0]})

@app.route("/cookies")
def cookies():
    ip = request.remote_addr
    location = get_location_from_ip(ip)
    cur.execute("SELECT 1 FROM visits WHERE ip=%s", (ip,))
    if not cur.fetchone():
        cur.execute("INSERT INTO visits (ip, location, unique_id) VALUES (%s, %s, %s)", (ip, location, ip))
        conn.commit()
        return jsonify({"unique": True, "ip": ip, "location": location})
    return jsonify({"unique": False, "ip": ip, "location": location})

@app.route("/user_contactus", methods=["POST"])
def user_contactus():
    data = request.get_json()
    message = data.get("message", "")[:512]
    ip = request.remote_addr
    location = get_location_from_ip(ip)
    cur.execute("INSERT INTO messages (ip, location, message) VALUES (%s, %s, %s)", (ip, location, message))
    conn.commit()
    return jsonify({"status": "stored"})

@app.route("/total_visits")
def total_visits():
    if not check_admin(request):
        return jsonify({"error": "Unauthorized"}), 401
    cur.execute("SELECT count FROM counters LIMIT 1;")
    return jsonify({"total_visits": cur.fetchone()[0]})

@app.route("/get_details")
def get_details():
    if not check_admin(request):
        return jsonify({"error": "Unauthorized"}), 401
    cur.execute("SELECT ip, location, unique_id, created_at FROM visits;")
    rows = cur.fetchall()
    return jsonify({"visits": rows})

@app.route("/messages_return")
def messages_return():
    if not check_admin(request):
        return jsonify({"error": "Unauthorized"}), 401
    cur.execute("SELECT ip, location, message, created_at FROM messages;")
    rows = cur.fetchall()
    return jsonify({"messages": rows})

# Vercel entry point
def handler(event, context):
    return app(event, context)

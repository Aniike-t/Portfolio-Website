# File: api/index.py

from flask import Flask, request, jsonify, g
from flask_cors import CORS 
import psycopg2
import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env file for local development
load_dotenv()

app = Flask(__name__)


# --- Environment Variables ---
DB_URL = os.getenv("NEON_DB_URL")
ADMIN_USER = os.getenv("ADMIN_USER")
ADMIN_PASS = os.getenv("ADMIN_PASS")
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS")


# --- CORS Configuration ---
CORS(app, resources={r"/*": {"origins": ALLOWED_ORIGINS}})


# --- Database Connection Management ---
def get_db():
    """
    Opens a new database connection for a request if one isn't already open.
    This connection is stored in Flask's special 'g' object, which is unique for each request.
    """
    if 'db' not in g:
        g.db = psycopg2.connect(DB_URL, sslmode="require")
    return g.db


@app.route("/")
def index():
    """A simple health check endpoint to show the server is running."""
    return "<h1>Flask Server is running!</h1>"


@app.teardown_appcontext
def close_db(e=None):
    """
    Closes the database connection at the end of the request to free up resources.
    This function is automatically called by Flask.
    """
    db = g.pop('db', None)
    if db is not None:
        db.close()

# --- Helper Functions ---
def get_user_ip():
    """Gets the real user IP address from Vercel's headers."""
    if 'x-forwarded-for' in request.headers:
        return request.headers['x-forwarded-for'].split(',')[0].strip()
    return request.remote_addr 

def get_location_from_ip(ip):
    """Fetches geolocation data for a given IP address."""
    try:
        # Avoid API calls for local development IPs
        if ip in ("127.0.0.1", "::1"): return "Localhost"
        
        res = requests.get(f"https://ipapi.co/{ip}/json/")
        if res.status_code == 200:
            data = res.json()
            return f"{data.get('city', 'Unknown')}, {data.get('region', '')}, {data.get('country_name', '')}"
    except Exception:
        # If the API fails for any reason, return "Unknown"
        pass
    return "Unknown"

def check_admin(req):
    """Checks for admin credentials in request headers."""
    return (
        req.headers.get("auth_user") == ADMIN_USER
        and req.headers.get("auth_pass") == ADMIN_PASS
    )

# --- API Routes (without /api prefix) ---

@app.route("/cookies")
def cookies():
    conn = get_db()
    cur = conn.cursor()
    ip = get_user_ip()
    location = get_location_from_ip(ip)
    
    # Check if this IP has visited before
    cur.execute("SELECT 1 FROM visits WHERE ip=%s", (ip,))
    if not cur.fetchone():
        # If it's a new (unique) visitor
        cur.execute("INSERT INTO visits (ip, location, unique_id) VALUES (%s, %s, %s)", (ip, location, ip))
        cur.execute("UPDATE counters SET count = count + 1;")
        conn.commit()
        cur.close()
        return jsonify({"unique": True, "ip": ip, "location": location})
    
    # If it's a returning visitor
    cur.close()
    return jsonify({"unique": False, "ip": ip, "location": location})

@app.route("/user_contactus", methods=["POST"])
def user_contactus():
    conn = get_db()
    cur = conn.cursor()
    data = request.get_json()
    message = data.get("message", "")[:512] # Truncate message to 512 chars
    ip = get_user_ip()
    location = get_location_from_ip(ip)
    
    cur.execute("INSERT INTO messages (ip, location, message) VALUES (%s, %s, %s)", (ip, location, message))
    conn.commit()
    cur.close()
    return jsonify({"status": "stored"})


@app.route("/total_visits")
def total_visits():
    if not check_admin(request): 
        return jsonify({"error": "Unauthorized"}), 401
    
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT count FROM counters LIMIT 1;")
    result = cur.fetchone()
    count = result[0] if result else 0
    cur.close()
    return jsonify({"total_visits": count})

@app.route("/get_details")
def get_details():
    if not check_admin(request): 
        return jsonify({"error": "Unauthorized"}), 401

    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT ip, location, unique_id, created_at FROM visits ORDER BY created_at DESC;")
    # Using psycopg2's ability to describe columns to build dictionaries
    columns = [desc[0] for desc in cur.description]
    visits = [dict(zip(columns, row)) for row in cur.fetchall()]
    cur.close()
    return jsonify({"visits": visits})

@app.route("/messages_return")
def messages_return():
    if not check_admin(request): 
        return jsonify({"error": "Unauthorized"}), 401
    
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT ip, location, message, created_at FROM messages ORDER BY created_at DESC;")
    columns = [desc[0] for desc in cur.description]
    messages = [dict(zip(columns, row)) for row in cur.fetchall()]
    cur.close()
    return jsonify({"messages": messages})
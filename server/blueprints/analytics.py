from flask import Blueprint, jsonify
from database import get_db
from utils import get_user_ip, get_location_from_ip

analytics_bp = Blueprint('analytics', __name__)

@analytics_bp.route("/cookies")
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

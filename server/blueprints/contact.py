from flask import Blueprint, request, jsonify
from database import get_db
from utils import get_user_ip, get_location_from_ip

contact_bp = Blueprint('contact', __name__)

@contact_bp.route("/user_contactus", methods=["POST"])
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

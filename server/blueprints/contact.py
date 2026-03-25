from flask import Blueprint, request, jsonify
from database import get_db
from utils import get_user_ip, get_location_from_ip


contact_bp = Blueprint('contact', __name__)

@contact_bp.route("/user_contactus", methods=["POST"])
def user_contactus():
    conn = get_db()
    cur = conn.cursor()
    data = request.get_json()
    name = data.get("name", "Anonymous")[:100]
    email = data.get("email", "Not provided")[:100]
    mobile = data.get("mobile", "Not provided")[:20]
    message = data.get("message", "")[:2000] 
    ip = get_user_ip()
    location = get_location_from_ip(ip)
    
    try:
        cur.execute("""
            INSERT INTO messages (ip, location, name, email, mobile, message) 
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (ip, location, name, email, mobile, message))
        conn.commit()
        return jsonify({"status": "stored", "message": "Success! I'll be in touch soon."})
    except Exception as e:
        if "column" in str(e).lower():
            try:
                cur.execute("ALTER TABLE messages ADD COLUMN IF NOT EXISTS name VARCHAR(100);")
                cur.execute("ALTER TABLE messages ADD COLUMN IF NOT EXISTS email VARCHAR(100);")
                cur.execute("ALTER TABLE messages ADD COLUMN IF NOT EXISTS mobile VARCHAR(20);")
                conn.commit()
                cur.execute("""
                    INSERT INTO messages (ip, location, name, email, mobile, message) 
                    VALUES (%s, %s, %s, %s, %s, %s)
                """, (ip, location, name, email, mobile, message))
                conn.commit()
                return jsonify({"status": "stored", "message": "Migrated & Stored Successfully."})
            except Exception as migrate_e:
                return jsonify({"status": "error", "error": str(migrate_e)}), 500
        return jsonify({"status": "error", "error": str(e)}), 500
    finally:
        cur.close()

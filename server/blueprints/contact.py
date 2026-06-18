from flask import Blueprint, request, jsonify
from database import get_db
from utils import get_user_ip, get_location_from_ip
import psycopg2


contact_bp = Blueprint('contact', __name__)

def _ensure_messages_table(cursor):
    """Create the messages table with expected columns if it does not exist."""
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS messages (
            id SERIAL PRIMARY KEY,
            ip VARCHAR(50),
            location VARCHAR(200),
            name VARCHAR(100),
            email VARCHAR(100),
            mobile VARCHAR(20),
            message TEXT,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );
        """
    )


@contact_bp.route("/user_contactus", methods=["POST"])
def user_contactus():
    conn = get_db()
    cur = conn.cursor()

    # Accept both JSON and form submissions. Fallback to an empty dict to avoid attribute errors.
    data = request.get_json(silent=True) or request.form or {}
    if not data:
        return jsonify({"status": "error", "error": "Missing request body"}), 400

    # Validate required fields: name, email, and message must be present and non-empty.
    required_fields = {k: (data.get(k) or "").strip() for k in ("name", "email", "message")}
    missing = [k for k, v in required_fields.items() if not v]
    if missing:
        return jsonify({
            "status": "error",
            "error": f"Missing required field(s): {', '.join(missing)}"
        }), 400

    # Defensive defaults and length guards to avoid oversized inputs breaking inserts.
    name = required_fields["name"][:100]
    email = required_fields["email"][:100]
    mobile = (data.get("mobile") or "Not provided")[:20]  # optional
    message = required_fields["message"][:2000]

    ip = get_user_ip()
    location = get_location_from_ip(ip)

    try:
        _ensure_messages_table(cur)
        cur.execute(
            """
                INSERT INTO messages (ip, location, name, email, mobile, message) 
                VALUES (%s, %s, %s, %s, %s, %s)
            """,
            (ip, location, name, email, mobile, message),
        )
        conn.commit()
        return jsonify({"status": "stored", "message": "Success! I'll be in touch soon."})
    except psycopg2.Error as e:
        conn.rollback()

        # If older tables are missing expected columns, migrate them in-place and retry once.
        if "column" in str(e).lower():
            try:
                cur.execute("ALTER TABLE messages ADD COLUMN IF NOT EXISTS name VARCHAR(100);")
                cur.execute("ALTER TABLE messages ADD COLUMN IF NOT EXISTS email VARCHAR(100);")
                cur.execute("ALTER TABLE messages ADD COLUMN IF NOT EXISTS mobile VARCHAR(20);")
                cur.execute("ALTER TABLE messages ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();")
                conn.commit()

                cur.execute(
                    """
                        INSERT INTO messages (ip, location, name, email, mobile, message) 
                        VALUES (%s, %s, %s, %s, %s, %s)
                    """,
                    (ip, location, name, email, mobile, message),
                )
                conn.commit()
                return jsonify({"status": "stored", "message": "Migrated & Stored Successfully."})
            except psycopg2.Error as migrate_e:
                conn.rollback()
                return jsonify({"status": "error", "error": str(migrate_e)}), 500

        # Unknown/connection errors bubble up in a controlled way for easier debugging.
        return jsonify({"status": "error", "error": str(e)}), 500
    finally:
        cur.close()

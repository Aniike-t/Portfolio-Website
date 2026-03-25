from flask import Blueprint, request, jsonify
from database import get_db
from utils import check_admin

admin_bp = Blueprint('admin', __name__)

@admin_bp.route("/total_visits")
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

@admin_bp.route("/get_details")
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

@admin_bp.route("/messages_return")
def messages_return():
    if not check_admin(request): 
        return jsonify({"error": "Unauthorized"}), 401
    
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT ip, location, name, email, mobile, message, created_at FROM messages ORDER BY created_at DESC;")
    columns = [desc[0] for desc in cur.description]
    messages = [dict(zip(columns, row)) for row in cur.fetchall()]
    cur.close()
    return jsonify({"messages": messages})


from flask import Blueprint, jsonify, request
import json
import psycopg2.extras
from database import get_db
from cache import cache

games_bp = Blueprint('games', __name__)

@games_bp.route("/get_games")
@cache.cached(timeout=600)
def get_games():
    conn = get_db()
    cur = conn.cursor()
    try:
        cur.execute("SELECT id, name, summary, media, url, technologies_used FROM games ORDER BY created_at DESC;")
        columns = [desc[0] for desc in cur.description]
        games = [dict(zip(columns, row)) for row in cur.fetchall()]
        cur.close()
        return jsonify(games)
    except Exception as e:
        cur.close()
        return jsonify({"error": str(e)}), 500

@games_bp.route("/init_games_db", methods=["POST"])
def init_games_db():
    conn = get_db()
    cur = conn.cursor()
    try:
        # Create table
        cur.execute("""
            CREATE TABLE IF NOT EXISTS games (
                id VARCHAR(50) PRIMARY KEY,
                name TEXT NOT NULL,
                summary TEXT,
                media JSONB,
                url TEXT,
                technologies_used JSONB,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)
        
        # Load initial data
        initial_data = request.get_json()
        if initial_data:
            for g in initial_data:
                cur.execute("""
                    INSERT INTO games (id, name, summary, media, url, technologies_used)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    ON CONFLICT (id) DO UPDATE SET
                    name = EXCLUDED.name,
                    summary = EXCLUDED.summary,
                    media = EXCLUDED.media,
                    url = EXCLUDED.url,
                    technologies_used = EXCLUDED.technologies_used;
                """, (
                    g['id'], 
                    g['name'], 
                    g['summary'], 
                    psycopg2.extras.Json(g['media']), 
                    g['url'],
                    psycopg2.extras.Json(g['technologies_used'])
                ))
        
        conn.commit()
        cur.close()
        return jsonify({"status": "Games database initialized!"})
    except Exception as e:
        conn.rollback()
        cur.close()
        return jsonify({"error": str(e)}), 500

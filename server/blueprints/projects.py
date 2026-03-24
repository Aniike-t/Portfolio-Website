from flask import Blueprint, jsonify, request
import json
import psycopg2.extras
from database import get_db
from cache import cache

projects_bp = Blueprint('projects', __name__)

@projects_bp.route("/get_projects")
@cache.cached(timeout=300)
def get_projects():
    conn = get_db()
    cur = conn.cursor()
    try:
        cur.execute("SELECT id, name, summary, problem_statement, media, technologies_used, github_repo, layout FROM projects ORDER BY created_at DESC;")
        columns = [desc[0] for desc in cur.description]
        projects = [dict(zip(columns, row)) for row in cur.fetchall()]
        cur.close()
        return jsonify(projects)
    except Exception as e:
        cur.close()
        return jsonify({"error": str(e)}), 500

@projects_bp.route("/get_project/<project_id>")
@cache.cached(timeout=600, query_string=True)
def get_project(project_id):
    conn = get_db()
    cur = conn.cursor()
    try:
        cur.execute("SELECT id, name, summary, problem_statement, media, technologies_used, github_repo, layout FROM projects WHERE id = %s;", (project_id,))
        row = cur.fetchone()
        if not row:
            return jsonify({"error": "Project not found"}), 404
        
        columns = [desc[0] for desc in cur.description]
        project = dict(zip(columns, row))
        cur.close()
        return jsonify(project)
    except Exception as e:
        cur.close()
        return jsonify({"error": str(e)}), 500

# This is a temporary setup route to create the table and seed initial data
@projects_bp.route("/init_projects_db", methods=["POST"])
def init_projects_db():
    # In a real app, you'd protect this route
    conn = get_db()
    cur = conn.cursor()
    try:
        # Create table
        cur.execute("""
            CREATE TABLE IF NOT EXISTS projects (
                id VARCHAR(50) PRIMARY KEY,
                name TEXT NOT NULL,
                summary TEXT,
                problem_statement TEXT,
                media JSONB,
                technologies_used JSONB,
                github_repo TEXT,
                layout JSONB,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)
        
        # Load initial data from the request body (the JSON you provided)
        initial_data = request.get_json()
        if initial_data:
            for p in initial_data:
                cur.execute("""
                    INSERT INTO projects (id, name, summary, problem_statement, media, technologies_used, github_repo, layout)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    ON CONFLICT (id) DO UPDATE SET
                    name = EXCLUDED.name,
                    summary = EXCLUDED.summary,
                    problem_statement = EXCLUDED.problem_statement,
                    media = EXCLUDED.media,
                    technologies_used = EXCLUDED.technologies_used,
                    github_repo = EXCLUDED.github_repo,
                    layout = EXCLUDED.layout;
                """, (
                    p['id'], 
                    p['name'], 
                    p['summary'], 
                    p['problem_statement'], 
                    psycopg2.extras.Json(p['media']), 
                    psycopg2.extras.Json(p['technologies_used']), 
                    p['github_repo'], 
                    psycopg2.extras.Json(p['layout'])
                ))
        
        conn.commit()
        cur.close()
        return jsonify({"status": "Database initialized and projects seeded!"})
    except Exception as e:
        conn.rollback()
        cur.close()
        return jsonify({"error": str(e)}), 500

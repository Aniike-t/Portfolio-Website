from flask import Flask
from flask_cors import CORS
from config import ALLOWED_ORIGINS
from database import close_db
from cache import cache
from blueprints.analytics import analytics_bp
from blueprints.admin import admin_bp
from blueprints.contact import contact_bp
from blueprints.projects import projects_bp
from blueprints.games import games_bp

app = Flask(__name__)
cache.init_app(app)

# --- CORS Configuration ---
CORS(app, resources={r"/*": {"origins": ALLOWED_ORIGINS}})

# Register blueprints
app.register_blueprint(analytics_bp)
app.register_blueprint(admin_bp)
app.register_blueprint(contact_bp)
app.register_blueprint(projects_bp)
app.register_blueprint(games_bp)

# teardown application context for database closing
app.teardown_appcontext(close_db)

@app.route("/")
def index():
    """A simple health check endpoint to show the server is running."""
    return "<h1>Flask Server is running!</h1>"

if __name__ == "__main__":
    app.run(debug=True)
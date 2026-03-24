import os
from dotenv import load_dotenv

load_dotenv()

# --- Environment Variables ---
DB_URL = os.getenv("NEON_DB_URL")
ADMIN_USER = os.getenv("ADMIN_USER")
ADMIN_PASS = os.getenv("ADMIN_PASS")
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS")

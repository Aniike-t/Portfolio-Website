import os
from dotenv import load_dotenv

load_dotenv()

# Support both the older NEON_DB_URL env and the common DATABASE_URL fallback.
DB_URL = os.getenv("NEON_DB_URL") or os.getenv("DATABASE_URL")
ADMIN_USER = os.getenv("ADMIN_USER")
ADMIN_PASS = os.getenv("ADMIN_PASS")

origins_env = os.getenv("ALLOWED_ORIGINS")
if origins_env:
    ALLOWED_ORIGINS = [o.strip() for o in origins_env.split(",")]
else:
    ALLOWED_ORIGINS = "*"

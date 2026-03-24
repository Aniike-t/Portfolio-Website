from flask import g
import psycopg2
import psycopg2.extras
from config import DB_URL

def get_db():
    if 'db' not in g:
        g.db = psycopg2.connect(DB_URL, sslmode="require")
        psycopg2.extras.register_default_jsonb(conn_or_curs=g.db)
    return g.db

def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()

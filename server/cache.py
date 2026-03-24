from flask_caching import Cache

# Cache configuration - simple in-memory cache for development
# In production, Redis or Memcached would be better
cache = Cache(config={'CACHE_TYPE': 'SimpleCache', 'CACHE_DEFAULT_TIMEOUT': 300})

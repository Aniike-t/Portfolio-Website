from flask import request
import requests
from config import ADMIN_USER, ADMIN_PASS

def get_user_ip():
    """Gets the real user IP address from Vercel's headers."""
    if 'x-forwarded-for' in request.headers:
        return request.headers['x-forwarded-for'].split(',')[0].strip()
    return request.remote_addr 

def get_location_from_ip(ip):
    """Fetches geolocation data for a given IP address."""
    try:
        # Avoid API calls for local development IPs
        if ip in ("127.0.0.1", "::1"): return "Localhost"
        
        res = requests.get(f"https://ipapi.co/{ip}/json/")
        if res.status_code == 200:
            data = res.json()
            return f"{data.get('city', 'Unknown')}, {data.get('region', '')}, {data.get('country_name', '')}"
    except Exception:
        # If the API fails for any reason, return "Unknown"
        pass
    return "Unknown"

def check_admin(req):
    """Checks for admin credentials in request headers."""
    return (
        req.headers.get("auth_user") == ADMIN_USER
        and req.headers.get("auth_pass") == ADMIN_PASS
    )

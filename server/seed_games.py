import requests
import json

games_data = [
  {
    "id": "tanks-a-heat",
    "name": "Tanks-a-heat",
    "summary": "A fast-paced tank battle game developed in 3 days. Command your tank and outmaneuver enemies in a retro-arcade environment.",
    "media": [
      { "type": "image", "url": "https://mafuscruvmcbdlvmepvx.supabase.co/storage/v1/object/public/PortfolioWebsite/TanksAHeat/gamelogotah.png" }
    ],
    "url": "https://aniike-t.itch.io/tanks-a-heat",
    "technologies_used": ["HTML5", "JavaScript", "Game Design"]
  }
]

url = "http://localhost:5000/init_games_db"
try:
    response = requests.post(url, json=games_data)
    print(f"Status: {response.json()}")
except Exception as e:
    print(f"Error: {e}")

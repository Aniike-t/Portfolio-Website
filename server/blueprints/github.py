from flask import Blueprint, jsonify
import requests
import os

github_bp = Blueprint('github', __name__)

GITHUB_USERNAME = "aniike-t"
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')

@github_bp.route('/get_github_heatmap')
def get_heatmap():
    if not GITHUB_TOKEN:
        return jsonify({"error": "No GITHUB_TOKEN provided in .env"}), 401
        
    query = """
    query($userName:String!) {
      user(login: $userName){
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
      }
    }
    """
    
    headers = {"Authorization": f"Bearer {GITHUB_TOKEN}"}
    
    try:
        response = requests.post(
            'https://api.github.com/graphql',
            json={'query': query, 'variables': {'userName': GITHUB_USERNAME}},
            headers=headers,
            timeout=10
        )
        response.raise_for_status()
        data = response.json()
        
        if 'errors' in data:
            return jsonify({"error": data['errors'][0]['message']}), 500
            
        calendar = data['data']['user']['contributionsCollection']['contributionCalendar']
        return jsonify(calendar)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@github_bp.route('/get_github_activity')
def get_activity():
    # Keep old endpoint for backwards compatibility during migration or use it for recent events if needed
    headers = {'Accept': 'application/vnd.github.v3+json'}
    if GITHUB_TOKEN:
        headers['Authorization'] = f'token {GITHUB_TOKEN}'
    
    url = f"https://api.github.com/users/{GITHUB_USERNAME}/events"
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        events = response.json()
        
        commits = []
        for event in events:
            if event['type'] == 'PushEvent':
                repo_name = event['repo']['name']
                event_commits = event.get('payload', {}).get('commits', [])
                for commit in event_commits:
                    commits.append({
                        'repo': repo_name,
                        'message': commit.get('message', 'No commit message'),
                        'sha': commit.get('sha', '')[:7],
                        'date': event['created_at'],
                        'url': f"https://github.com/{repo_name}/commit/{commit.get('sha', '')}"
                    })
        return jsonify(commits[:10])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

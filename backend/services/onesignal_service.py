import requests
import os
from dotenv import load_dotenv

load_dotenv()

ONESIGNAL_APP_ID = os.getenv("ONESIGNAL_APP_ID")
ONESIGNAL_API_KEY = os.getenv("ONESIGNAL_API_KEY")


def send_to_all(message: str):
    url = "https://onesignal.com/api/v1/notifications"

    headers = {
        "Authorization": f"Basic {ONESIGNAL_API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "app_id": ONESIGNAL_APP_ID,
        "included_segments": ["All"],
        "contents": {"en": message}
    }

    res = requests.post(url, headers=headers, json=data)
    return res.json()


def send_to_players(player_ids: list[str], message: str):
    url = "https://onesignal.com/api/v1/notifications"

    headers = {
        "Authorization": f"Basic {ONESIGNAL_API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "app_id": ONESIGNAL_APP_ID,
        "include_player_ids": player_ids,
        "contents": {"en": message}
    }

    res = requests.post(url, headers=headers, json=data)
    return res.json()
import requests
import os
from dotenv import load_dotenv

load_dotenv()

ONESIGNAL_APP_ID = os.getenv("ONESIGNAL_APP_ID")
ONESIGNAL_API_KEY = os.getenv("ONESIGNAL_API_KEY")
ONESIGNAL_NOTIFICATIONS_URL = "https://api.onesignal.com/notifications?c=push"
REQUEST_TIMEOUT_SECONDS = 10
DEFAULT_BROADCAST_SEGMENT = "Active Subscriptions"


def _build_headers():
    return {
        "Authorization": f"Key {ONESIGNAL_API_KEY}",
        "Content-Type": "application/json"
    }


def _parse_response(res: requests.Response):
    try:
        return res.json()
    except ValueError:
        return {
            "status_code": res.status_code,
            "text": res.text
        }


def _ensure_configured():
    missing_variables = []

    if not ONESIGNAL_APP_ID:
        missing_variables.append("ONESIGNAL_APP_ID")
    if not ONESIGNAL_API_KEY:
        missing_variables.append("ONESIGNAL_API_KEY")

    if missing_variables:
        missing = ", ".join(missing_variables)
        raise RuntimeError(f"Missing OneSignal configuration: {missing}")


def _post_notification(data: dict):
    _ensure_configured()

    res = requests.post(
        ONESIGNAL_NOTIFICATIONS_URL,
        headers=_build_headers(),
        json=data,
        timeout=REQUEST_TIMEOUT_SECONDS,
    )
    parsed = _parse_response(res)
    if not isinstance(parsed, dict):
        parsed = {"data": parsed}

    parsed.setdefault("status_code", res.status_code)
    if not res.ok:
        details = parsed.get("errors") or parsed.get("text") or parsed
        raise RuntimeError(
            f"OneSignal request failed with status {res.status_code}: {details}"
        )

    errors = parsed.get("errors")
    if errors:
        raise RuntimeError(
            f"OneSignal accepted the request but returned errors: {errors}"
        )

    if not parsed.get("id"):
        raise RuntimeError(
            f"OneSignal accepted the request but did not create a message: {parsed}"
        )

    return parsed


def send_to_all(message: str):
    data = {
        "app_id": ONESIGNAL_APP_ID,
        "target_channel": "push",
        "included_segments": [DEFAULT_BROADCAST_SEGMENT],
        "contents": {"en": message}
    }

    return _post_notification(data)


def send_to_players(player_ids: list[str], message: str):
    data = {
        "app_id": ONESIGNAL_APP_ID,
        "target_channel": "push",
        "include_subscription_ids": player_ids,
        "contents": {"en": message}
    }

    return _post_notification(data)

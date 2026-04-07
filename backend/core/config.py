import os
from urllib.parse import urlparse

from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
_DEFAULT_API_BASE_URL = (
    "https://jeane-unubiquitous-superprecariously.ngrok-free.dev/PKA_ElderGuard"
)


def _normalize_api_base_url(raw_value: str | None) -> str:
    candidate = (raw_value or _DEFAULT_API_BASE_URL).strip()
    if not candidate:
        candidate = _DEFAULT_API_BASE_URL

    return candidate.rstrip("/")


API_BASE_URL = _normalize_api_base_url(os.getenv("API_BASE_URL"))
API_PREFIX = urlparse(API_BASE_URL).path.rstrip("/") or "/PKA_ElderGuard"

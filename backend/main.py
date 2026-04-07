from fastapi import FastAPI
from api.router import api_router
from core.config import API_BASE_URL, API_PREFIX
from db.database import engine
from db.base import Base

app = FastAPI(
    title="pka-elder-guard-web-app",
    servers=[
        {
            "url": API_BASE_URL,
            "description": "Configured API base URL",
        }
    ],
)

Base.metadata.create_all(bind=engine)

app.include_router(api_router, prefix=API_PREFIX)

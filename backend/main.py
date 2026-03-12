from fastapi import FastAPI
from api.router import api_router
from db.database import engine
from db.base import Base

app = FastAPI(title="pka-elder-guard-web-app")

Base.metadata.create_all(bind=engine)

app.include_router(api_router, prefix="/PKA_ElderGuard")
from fastapi import APIRouter
from api.endpoints import auth
from api.endpoints import event

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
api_router.include_router(event.router)
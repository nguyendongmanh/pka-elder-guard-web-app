from fastapi import APIRouter
from api.endpoints import auth
from api.endpoints import event
from api.endpoints import camera_watch
from api.endpoints import notification

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
api_router.include_router(event.router)
api_router.include_router(camera_watch.router)
api_router.include_router(notification.router)

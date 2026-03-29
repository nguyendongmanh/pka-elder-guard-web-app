from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from crud.camera_crud import create_camera
from schemas.camera_watch import CameraWatchCreate

router = APIRouter()

@router.post("/create/cameras")
def add_camera(camera: CameraWatchCreate, db: Session = Depends(get_db)):
    try:
        camera = create_camera(db, camera.user_id, camera.camera_name)
        return {"status": "success", "camera": {"id": camera.id, "name": camera.camera_name}}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
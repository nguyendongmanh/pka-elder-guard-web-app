from sqlalchemy.orm import Session
from models.camera_watch import CameraWatch



def create_camera(db: Session, user_id: int, camera_name: str):
    camera = CameraWatch(
        user_id=user_id,
        camera_name=camera_name,
        is_active=True
    )
    db.add(camera)
    db.commit()
    db.refresh(camera)
    return camera


# 📌 GET ALL (theo user)
def get_cameras_by_user(db: Session, user_id: int):
    return db.query(CameraWatch).filter(CameraWatch.user_id == user_id).all()


# 📌 GET ONE
def get_camera_by_id(db: Session, camera_id: int):
    return db.query(CameraWatch).filter(CameraWatch.id == camera_id).first()


def update_camera(db: Session, camera_id: int, data: dict):
    camera = db.query(CameraWatch).filter(CameraWatch.id == camera_id).first()
    if not camera:
        return None

    for key, value in data.items():
        setattr(camera, key, value)

    db.commit()
    db.refresh(camera)
    return camera


def delete_camera(db: Session, camera_id: int):
    camera = db.query(CameraWatch).filter(CameraWatch.id == camera_id).first()
    if not camera:
        return False

    db.delete(camera)
    db.commit()
    return True



def toggle_camera_status(db: Session, camera_id: int):
    camera = db.query(CameraWatch).filter(CameraWatch.id == camera_id).first()
    if not camera:
        return None

    camera.is_active = not camera.is_active
    db.commit()
    db.refresh(camera)
    return camera
from models.camera_watch import CameraWatch
from models.user_devices import UserDevices
from sqlalchemy.orm import Session
from models.user import User


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_user_by_camera(db: Session, camera_id: int):
    return db.query(User).join(CameraWatch).filter(CameraWatch.id == camera_id).first()


def create_user(db: Session, email: str, username: str, hashed_password: str):
    user = User(
        email=email,
        username=username,
        hashed_password=hashed_password
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user
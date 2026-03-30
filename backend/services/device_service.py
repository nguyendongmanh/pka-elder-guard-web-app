from sqlalchemy.orm import Session
from models.user_devices import UserDevices


def save_player_id(db: Session, user_id: int, player_id: str):
    device = db.query(UserDevices).filter_by(player_id=player_id).first()

    if not device:
        device = UserDevices(
            user_id=user_id,
            player_id=player_id
        )
        db.add(device)
    else:
        device.user_id = user_id  # update nếu đổi user

    db.commit()
    return device


def get_player_ids_by_user(db: Session, user_id: int):
    devices = db.query(UserDevices).filter_by(user_id=user_id).all()
    return [d.player_id for d in devices]

def delete_player_id(db: Session, player_id: str):
    device = db.query(UserDevices).filter_by(player_id=player_id).first()

    if device:
        db.delete(device)
        db.commit()
        return True

    return False
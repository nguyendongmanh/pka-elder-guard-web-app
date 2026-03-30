from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from services.onesignal_service import send_to_players
from services.device_service import delete_player_id, get_player_ids_by_user, save_player_id

router = APIRouter(prefix="/notify", tags=["Notification"])


@router.post("/user/{user_id}")
def notify_user(user_id: int, db: Session = Depends(get_db)):
    player_ids = get_player_ids_by_user(db, user_id)

    if not player_ids:
        return {"error": "No devices"}

    res = send_to_players(player_ids, "Bạn có thông báo mới ")

    return {"status": "sent", "onesignal": res}


@router.post("/register")
def register_device(user_id: int, player_id: str, db: Session = Depends(get_db)):
    device = save_player_id(db, user_id, player_id)
    return {
        "status": "registered",
        "player_id": device.player_id,
        "user_id": device.user_id
    }

@router.delete("/remove")
def remove_device(player_id: str, db: Session = Depends(get_db)):
    success = delete_player_id(db, player_id)

    if not success:
        return {"error": "Device not found"}

    return {"status": "removed"}
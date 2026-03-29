from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from services.onesignal_service import send_to_players
from services.device_service import get_player_ids_by_user

router = APIRouter(prefix="/notify", tags=["Notification"])


@router.post("/user/{user_id}")
def notify_user(user_id: int, db: Session = Depends(get_db)):
    player_ids = get_player_ids_by_user(db, user_id)

    if not player_ids:
        return {"error": "No devices"}

    res = send_to_players(player_ids, "Bạn có thông báo mới 🔔")

    return {"status": "sent", "onesignal": res}
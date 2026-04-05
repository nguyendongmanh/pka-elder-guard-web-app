from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from services.onesignal_service import send_to_all, send_to_players
from services.device_service import delete_player_id, get_player_ids_by_user, save_player_id


router = APIRouter(prefix="/notify", tags=["Notification"])


@router.post("/user/{user_id}")
def notify_user(
    user_id: int,
    message: str = "Bạn có thông báo mới",
    db: Session = Depends(get_db),
):
    player_ids = get_player_ids_by_user(db, user_id)

    if not player_ids:
        return {"status": "skipped", "error": "No devices", "user_id": user_id}

    try:
        res = send_to_players(player_ids, message)
    except RuntimeError as error:
        raise HTTPException(
            status_code=502,
            detail=f"Failed to send push notification: {error}",
        ) from error

    return {
        "status": "sent",
        "user_id": user_id,
        "device_count": len(player_ids),
        "message": message,
        "onesignal": res,
    }


@router.post("/all")
def notify_all(message: str = "Chào mừng bạn đến với ElderGuard"):
    try:
        res = send_to_all(message)
    except RuntimeError as error:
        raise HTTPException(
            status_code=502,
            detail=f"Failed to send push notification: {error}",
        ) from error
    return {"status": "sent", "onesignal": res, "message": message}


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

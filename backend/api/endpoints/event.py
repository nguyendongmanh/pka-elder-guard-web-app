from services.device_service import get_player_ids_by_user
from services.onesignal_service import send_to_players
from crud.user_crud import get_user_by_camera
from fastapi import APIRouter, Depends, HTTPException
from db.database import get_db
from schemas.event_schema import EventCreate
from models.event import Event
from sqlalchemy.orm import Session
from services.event_service import process_event


router = APIRouter()

@router.post("/events")
async def recieve_event(data: EventCreate, db: Session = Depends(get_db)):
    message = process_event(data)

    db_event = Event(
        camera_id=data.camera_id,
        event_type=data.event_type,
        confidence=data.confidence,
        timestamp=data.timestamp
    )

    db.add(db_event)
    db.commit()

    user = get_user_by_camera(db,data.camera_id)
    if not user:
        return {
            "status": "ok",
            "message": "No user for this camera",
            "push": {
                "status": "skipped",
                "reason": "camera_not_assigned",
                "camera_id": data.camera_id,
            },
        }
    if message:
        player_ids = get_player_ids_by_user(db, user.id)

        if player_ids:
            try:
                push_result = send_to_players(
                    player_ids,
                    f"Cảnh báo: {data.event_type} tại camera {data.camera_id}"
                )
            except RuntimeError as error:
                raise HTTPException(
                    status_code=502,
                    detail=f"Failed to send push notification: {error}",
                ) from error

            return {
                "status": "ok",
                "message": message,
                "push": {
                    "status": "sent",
                    "user_id": user.id,
                    "device_count": len(player_ids),
                    "onesignal": push_result,
                },
            }

        return {
            "status": "ok",
            "message": message,
            "push": {
                "status": "skipped",
                "reason": "no_registered_devices",
                "user_id": user.id,
                "camera_id": data.camera_id,
            },
        }

    return {
        "status": "ok",
        "message": message,
        "push": {
            "status": "skipped",
            "reason": "event_below_threshold",
            "camera_id": data.camera_id,
        },
    }

from services.device_service import get_player_ids_by_user
from services.onesignal_service import send_to_players
from crud.user_crud import get_user_by_camera
from fastapi import APIRouter, Depends, HTTPException
from db.database import get_db
from schemas.event_schema import EventCreate
from models.event import Event
from sqlalchemy.orm import Session
from services.event_service import process_event
from services.onesignal_service import send_to_all
from schemas.lost_event import LostEventCreate



router = APIRouter()


def _build_event_push_content(event_type: str, camera_id: int) -> tuple[str, str]:
    normalized_event_type = event_type.strip().lower()

    if normalized_event_type == "fall_detected":
        return (
            "Cảnh báo té ngã",
            f"Phát hiện té ngã tại camera {camera_id}",
        )

    if normalized_event_type == "violence_detected":
        return (
            "Cảnh báo bạo lực",
            f"Phát hiện bạo lực tại camera {camera_id}",
        )

    if normalized_event_type == "imobile_detected":
        return (
            "Cảnh báo bất động",
            f"Phát hiện bất động tại camera {camera_id}",
        )

    return (
        "Cảnh báo camera",
        f"Phát hiện sự kiện {event_type} tại camera {camera_id}",
    )


@router.post("/events")
async def recieve_event(data: EventCreate, db: Session = Depends(get_db)):
    heading, message = _build_event_push_content(data.event_type, data.camera_id)

    db_event = Event(
        camera_id=data.camera_id,
        event_type=data.event_type,
        confidence=data.confidence,
        timestamp=data.timestamp,
        url=data.url
    )

    db.add(db_event)
    db.commit()
    db.refresh(db_event)

    if message:
        try:
            push_result = send_to_all(
                message,
                heading=heading,
                data={
                    "camera_id": data.camera_id,
                    "event_type": data.event_type,
                    "event_id": db_event.id,
                },
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
                "status": "sent_to_all",
                "onesignal": push_result,
            },
        }

    return {
        "status": "ok",
        "message": message,
        "push": {
            "status": "skipped",
            "reason": "event_below_threshold",
        },
    }





@router.post("/lost")
async def recieve_lost_event(data: LostEventCreate, db: Session = Depends(get_db)):
    message = f"Cảnh báo: Có người bị lạc với khoảng cách {data.distance} mét"

    if message:
        try:
            push_result = send_to_all(message)
        except RuntimeError as error:
            raise HTTPException(
                status_code=502,
                detail=f"Failed to send push notification: {error}",
            ) from error

        return {
            "status": "ok",
            "message": message,
            "push": {
                "status": "sent_to_all",
                "onesignal": push_result,
            },
        }

    return {
        "status": "ok",
        "message": message,
        "push": {
            "status": "skipped",
            "reason": "event_below_threshold",
        },
    }

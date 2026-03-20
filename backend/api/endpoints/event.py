from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from schemas.event_schema import EventCreate
from services.event_service import process_event
from models.event import Event

router = APIRouter()

@router.post("/events")
async def recieve_event(data: EventCreate,db: Session = Depends(get_db)):
    message = process_event(data)

    # lưu DB
    db_event = Event(
        camera_id=data.camera_id,
        event_type=data.event_type,
        confidence=data.confidence,
        timestamp=data.timestamp
    )

    db.add(db_event)
    db.commit()

    # gửi thông báo (demo)
    if message:
        print("NOTIFICATION:", message)

    return {"status": "ok", "message": message}
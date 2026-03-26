from fastapi import APIRouter, Depends,WebSocket,WebSocketDisconnect
from sqlalchemy.orm import Session
from db.database import get_db
from schemas.event_schema import EventCreate
from services.event_service import process_event
from models.event import Event
from services.websocket_manager import manager

router = APIRouter()

@router.websocket("/alerts")
async def websocket_endpoint(websocket:WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)


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
        alert_payload = {
            "event_type" : data.event_type,
            "camera_id" : data.camera_id,
            "timestamp" : str(data.timestamp)

        }

        await manager.broadcast(alert_payload)

    return {"status": "ok", "message": message}
    


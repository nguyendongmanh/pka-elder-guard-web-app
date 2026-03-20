from pydantic import BaseModel
from datetime import datetime

class EventCreate(BaseModel):
    camera_id: int
    timestamp: datetime
    event_type: str
    confidence: float





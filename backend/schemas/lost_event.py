from pydantic import BaseModel
from datetime import datetime

class LostEventCreate(BaseModel):
    timestamp: datetime
    event_type: str
    anchor_url : str
    current_url : str
    distance: float
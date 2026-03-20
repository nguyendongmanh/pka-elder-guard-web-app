from db.base import Base
from sqlalchemy import Column, Integer, String, DateTime, Float

class Event(Base):
    __tablename__ = 'events'

    id = Column(Integer, primary_key=True, index=True)
    camera_id = Column(Integer, index=True)
    timestamp = Column(DateTime)
    event_type = Column(String)
    confidence = Column(Float)

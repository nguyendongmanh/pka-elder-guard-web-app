from sqlalchemy import Column, DateTime, Float, Integer, String
from sqlalchemy.sql import func

from db.base import Base


class DeviceLocation(Base):
    __tablename__ = "device_locations"

    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(String(255), nullable=False, index=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    distance_meters = Column(Float, nullable=True)
    is_safe = Column(Integer, nullable=False, default=1)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

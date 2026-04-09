from sqlalchemy import Column, DateTime, Float, Integer, String
from sqlalchemy.sql import func

from db.base import Base


class Geofence(Base):
    __tablename__ = "geofences"

    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(String(255), unique=True, nullable=False, index=True)
    anchor_latitude = Column(Float, nullable=False)
    anchor_longitude = Column(Float, nullable=False)
    radius_meters = Column(Float, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )

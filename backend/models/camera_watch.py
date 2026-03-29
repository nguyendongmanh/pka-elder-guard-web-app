from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from db.base import Base


class CameraWatch(Base):
    __tablename__ = "camera_watch"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    camera_name = Column(String(255), nullable=False)

    # địa chỉ stream
    stream_url = Column(String(500))
    is_active = Column(Boolean, default=True)


    user = relationship("User", back_populates="cameras")
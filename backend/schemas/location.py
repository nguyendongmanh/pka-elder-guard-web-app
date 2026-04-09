from datetime import datetime

from pydantic import BaseModel, Field


class LocationUpdateRequest(BaseModel):
    device_id: str = Field(min_length=1, max_length=255)
    latitude: float = Field(ge=-90, le=90)
    longitude: float = Field(ge=-180, le=180)


class LocationCheckResult(BaseModel):
    device_id: str
    latitude: float
    longitude: float
    anchor_latitude: float
    anchor_longitude: float
    distance_meters: float
    radius_meters: float
    is_safe: bool
    message: str


class LocationHistoryItem(BaseModel):
    id: int
    device_id: str
    latitude: float
    longitude: float
    distance_meters: float | None = None
    is_safe: bool
    created_at: datetime | None = None


class LocationHistoryResponse(BaseModel):
    device_id: str
    total: int
    locations: list[LocationHistoryItem]

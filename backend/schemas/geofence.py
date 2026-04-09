from datetime import datetime

from pydantic import BaseModel, Field


class GeofenceCreate(BaseModel):
    device_id: str = Field(min_length=1, max_length=255)
    anchor_latitude: float = Field(ge=-90, le=90)
    anchor_longitude: float = Field(ge=-180, le=180)
    radius_meters: float = Field(gt=0)


class GeofenceData(BaseModel):
    id: int
    device_id: str
    anchor_latitude: float
    anchor_longitude: float
    radius_meters: float
    created_at: datetime | None = None
    updated_at: datetime | None = None


class GeofenceUpsertResponse(BaseModel):
    status: str
    geofence: GeofenceData

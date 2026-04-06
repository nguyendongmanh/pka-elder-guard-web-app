from fastapi import APIRouter, Depends, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from crud.geofence_crud import upsert_geofence
from db.database import get_db
from models.geofence import Geofence
from schemas.geofence import GeofenceCreate, GeofenceUpsertResponse

router = APIRouter(prefix="/geofences", tags=["Geofence"])


def _serialize_geofence(geofence: Geofence) -> dict:
    return {
        "id": geofence.id,
        "device_id": geofence.device_id,
        "anchor_latitude": geofence.anchor_latitude,
        "anchor_longitude": geofence.anchor_longitude,
        "radius_meters": geofence.radius_meters,
        "created_at": geofence.created_at,
        "updated_at": geofence.updated_at,
    }


@router.post("", response_model=GeofenceUpsertResponse, status_code=status.HTTP_201_CREATED)
def create_geofence(data: GeofenceCreate, db: Session = Depends(get_db)):
    geofence, created = upsert_geofence(db, data)
    response_payload = {
        "status": "created" if created else "updated",
        "geofence": _serialize_geofence(geofence),
    }

    if created:
        return response_payload

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content=jsonable_encoder(response_payload),
    )

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
import requests as http_requests
from sqlalchemy.orm import Session

from crud.location_crud import save_location, get_location_history
from db.database import get_db
from models.geofence import Geofence
from schemas.location import (
    LocationUpdateRequest,
    LocationCheckResult,
    LocationHistoryResponse,
    LocationHistoryItem,
)
from services.location_service import check_geofence
from services.onesignal_service import send_to_all

router = APIRouter(prefix="/locations", tags=["Location"])

EXTERNAL_LOCATION_API = "http://54.206.94.56:8000/api/v1/location"


class ExternalLocationPayload(BaseModel):
    device_id: str
    latitude: float
    longitude: float


@router.post("/forward")
def forward_location(payload: ExternalLocationPayload):
    try:
        res = http_requests.post(
            EXTERNAL_LOCATION_API,
            json={
                "device_id": payload.device_id,
                "latitude": payload.latitude,
                "longitude": payload.longitude,
            },
            timeout=10,
        )
        try:
            body = res.json()
        except ValueError:
            body = {"raw": res.text}

        return {
            "status_code": res.status_code,
            "ok": res.ok,
            "data": body,
        }
    except http_requests.RequestException as e:
        raise HTTPException(status_code=502, detail=str(e))


@router.post("/update", response_model=LocationCheckResult)
def update_location(data: LocationUpdateRequest, db: Session = Depends(get_db)):
    geofence = (
        db.query(Geofence)
        .filter(Geofence.device_id == data.device_id)
        .first()
    )

    if not geofence:
        raise HTTPException(
            status_code=404,
            detail=f"No geofence configured for device '{data.device_id}'. Please create a geofence first.",
        )

    distance_meters, is_safe = check_geofence(
        geofence, data.latitude, data.longitude
    )

    save_location(
        db,
        device_id=data.device_id,
        latitude=data.latitude,
        longitude=data.longitude,
        distance_meters=distance_meters,
        is_safe=is_safe,
    )

    if not is_safe:
        alert_message = (
            f"[CANH BAO] Thiet bi {data.device_id} da ra ngoai vung an toan! "
            f"Khoang cach: {distance_meters:.1f}m (gioi han: {geofence.radius_meters:.0f}m)"
        )
        try:
            send_to_all(alert_message)
        except Exception:
            pass

    message = (
        "Trong vung an toan"
        if is_safe
        else f"NGOAI VUNG AN TOAN - Cach {distance_meters:.1f}m"
    )

    return LocationCheckResult(
        device_id=data.device_id,
        latitude=data.latitude,
        longitude=data.longitude,
        anchor_latitude=geofence.anchor_latitude,
        anchor_longitude=geofence.anchor_longitude,
        distance_meters=round(distance_meters, 2),
        radius_meters=geofence.radius_meters,
        is_safe=is_safe,
        message=message,
    )


@router.get("/history/{device_id}", response_model=LocationHistoryResponse)
def location_history(
    device_id: str,
    limit: int = Query(default=50, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
    db: Session = Depends(get_db),
):
    total, locations = get_location_history(db, device_id, limit, offset)

    items = [
        LocationHistoryItem(
            id=loc.id,
            device_id=loc.device_id,
            latitude=loc.latitude,
            longitude=loc.longitude,
            distance_meters=loc.distance_meters,
            is_safe=bool(loc.is_safe),
            created_at=loc.created_at,
        )
        for loc in locations
    ]

    return LocationHistoryResponse(
        device_id=device_id,
        total=total,
        locations=items,
    )

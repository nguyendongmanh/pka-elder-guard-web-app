from fastapi import APIRouter, Depends, HTTPException, Query
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

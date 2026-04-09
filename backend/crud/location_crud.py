from sqlalchemy.orm import Session

from models.device_location import DeviceLocation


def save_location(
    db: Session,
    device_id: str,
    latitude: float,
    longitude: float,
    distance_meters: float | None,
    is_safe: bool,
):
    location = DeviceLocation(
        device_id=device_id,
        latitude=latitude,
        longitude=longitude,
        distance_meters=distance_meters,
        is_safe=1 if is_safe else 0,
    )
    db.add(location)
    db.commit()
    db.refresh(location)
    return location


def get_location_history(
    db: Session,
    device_id: str,
    limit: int = 50,
    offset: int = 0,
):
    query = (
        db.query(DeviceLocation)
        .filter(DeviceLocation.device_id == device_id)
        .order_by(DeviceLocation.created_at.desc())
    )
    total = query.count()
    locations = query.offset(offset).limit(limit).all()
    return total, locations

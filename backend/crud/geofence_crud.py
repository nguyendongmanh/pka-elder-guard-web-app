from sqlalchemy.orm import Session

from models.geofence import Geofence
from schemas.geofence import GeofenceCreate


def upsert_geofence(db: Session, payload: GeofenceCreate):
    geofence = db.query(Geofence).filter(Geofence.device_id == payload.device_id).first()
    created = geofence is None

    if created:
        geofence = Geofence(
            device_id=payload.device_id,
            anchor_latitude=payload.anchor_latitude,
            anchor_longitude=payload.anchor_longitude,
            radius_meters=payload.radius_meters,
        )
        db.add(geofence)
    else:
        geofence.anchor_latitude = payload.anchor_latitude
        geofence.anchor_longitude = payload.anchor_longitude
        geofence.radius_meters = payload.radius_meters

    db.commit()
    db.refresh(geofence)
    return geofence, created

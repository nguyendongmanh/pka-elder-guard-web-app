import math

from models.geofence import Geofence


def haversine_distance(
    lat1: float,
    lon1: float,
    lat2: float,
    lon2: float,
) -> float:
    R = 6371000.0
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)

    a = (
        math.sin(delta_phi / 2) ** 2
        + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2) ** 2
    )
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return R * c


def check_geofence(
    geofence: Geofence,
    device_lat: float,
    device_lon: float,
) -> tuple[float, bool]:
    distance = haversine_distance(
        geofence.anchor_latitude,
        geofence.anchor_longitude,
        device_lat,
        device_lon,
    )
    is_safe = distance <= geofence.radius_meters
    return distance, is_safe

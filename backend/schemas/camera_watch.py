from pydantic import BaseModel


class CameraWatchCreate(BaseModel):
    user_id: int
    camera_name : str
    is_active: bool = True
# schemas/health_record.py
from pydantic import BaseModel
from datetime import date, time

class HealthRecordCreate(BaseModel):
    date: date
    time: time
    status: str

    heart_rate: int
    spo2: float

    systolic_bp: int
    diastolic_bp: int

    stress: int

    calories: float
    total_calories: float


class HealthRecordResponse(HealthRecordCreate):
    id: int
    user_id: int

    class Config:
        from_attributes = True
# ==========================================================
# File: routes/sensors.py
# Purpose: Real-time sensor readings, IoT telemetry ingestion, and thresholds
# ==========================================================

from typing import List, Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import SensorReading, Incident
from schemas import SensorReadingCreate, SensorReadingResponse
from services.alert_service import alert_service

router = APIRouter(prefix="/sensors", tags=["Sensors & Telemetry"])

@router.get("/", response_model=List[SensorReadingResponse])
def get_sensor_readings(
    incident_id: Optional[int] = None,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    """Fetch latest sensor readings with optional incident filter."""
    query = db.query(SensorReading)
    if incident_id:
        query = query.filter(SensorReading.incident_id == incident_id)
    return query.order_by(SensorReading.reading_timestamp.desc()).limit(limit).all()

@router.post("/", response_model=SensorReadingResponse, status_code=status.HTTP_201_CREATED)
def ingest_sensor_reading(
    reading: SensorReadingCreate,
    db: Session = Depends(get_db)
):
    """Ingest live sensor telemetry and evaluate instantaneous hazard thresholds."""
    is_anomaly = bool(
        (reading.temperature_celsius and reading.temperature_celsius >= 50.0) or
        (reading.smoke_obscuration_pct and reading.smoke_obscuration_pct >= 70.0) or
        (reading.co_ppm and reading.co_ppm >= 100)
    )

    db_reading = SensorReading(
        incident_id=reading.incident_id,
        building_id=reading.building_id,
        zone_id=reading.zone_id,
        sensor_code=reading.sensor_code,
        sensor_type=reading.sensor_type,
        temperature_celsius=reading.temperature_celsius,
        smoke_obscuration_pct=reading.smoke_obscuration_pct,
        co_ppm=reading.co_ppm,
        heat_flux_kw_m2=reading.heat_flux_kw_m2,
        is_anomaly=is_anomaly,
        reading_timestamp=datetime.utcnow()
    )
    db.add(db_reading)
    db.commit()
    db.refresh(db_reading)

    # Evaluate hazard alert generation
    if reading.incident_id:
        alert_service.evaluate_sensor_anomaly(
            db=db,
            incident_id=reading.incident_id,
            sensor_code=reading.sensor_code,
            temperature=float(reading.temperature_celsius or 0),
            smoke_obscuration=float(reading.smoke_obscuration_pct or 0),
            co_ppm=int(reading.co_ppm or 0)
        )

    return db_reading

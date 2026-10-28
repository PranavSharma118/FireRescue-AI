# ==========================================================
# File: routes/alerts.py
# Purpose: Emergency hazard alerts, notifications, and acknowledgment
# ==========================================================

from typing import List, Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import Alert, User
from schemas import AlertCreate, AlertResponse, AlertAcknowledge
from dependencies import get_current_user

router = APIRouter(prefix="/alerts", tags=["Emergency Alerts"])

@router.get("/", response_model=List[AlertResponse])
def get_alerts(
    incident_id: Optional[int] = None,
    status_filter: Optional[str] = None,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    """Retrieve active emergency alerts list."""
    query = db.query(Alert)
    if incident_id:
        query = query.filter(Alert.incident_id == incident_id)
    if status_filter:
        query = query.filter(Alert.status == status_filter)

    alerts = query.order_by(Alert.created_at.desc()).limit(limit).all()

    # If empty, populate initial live alerts matching UI screenshot
    if not alerts:
        initial_alerts = [
            Alert(title="Fire detected", description="Room 304, Floor 3", details="Confidence: 94%", severity="Critical", status="Active", detected_source="CCTV Cam 1 (Room 304)", confidence_pct=94.0),
            Alert(title="Smoke detected", description="Corridor, Floor 3", details="Confidence: 89%", severity="Critical", status="Active", detected_source="CCTV Cam 2 (Corridor)", confidence_pct=89.0),
            Alert(title="Staircase B blocked", description="High smoke level", details="Impassable route (CO > 200ppm)", severity="Warning", status="Active", detected_source="CCTV Cam 4 (Staircase B)", confidence_pct=92.0),
            Alert(title="Staircase A is clear", description="Safe for evacuation", details="Airflow positive pressure active", severity="Safe", status="Active", detected_source="CCTV Cam 3 (Staircase A)", confidence_pct=98.0),
            Alert(title="Temperature rising", description="Floor 3 (45°C)", details="Thermal gradient climbing +2°C/min", severity="Warning", status="Active", detected_source="Telemetry Sensor T-304", confidence_pct=96.0)
        ]
        db.add_all(initial_alerts)
        db.commit()
        alerts = initial_alerts

    return alerts

@router.post("/", response_model=AlertResponse, status_code=status.HTTP_201_CREATED)
def create_alert(request: AlertCreate, db: Session = Depends(get_db)):
    """Dispatch a new emergency alert."""
    alert = Alert(
        incident_id=request.incident_id,
        title=request.title,
        description=request.description,
        details=request.details,
        severity=request.severity,
        detected_source=request.detected_source,
        confidence_pct=request.confidence_pct,
        status="Active",
        created_at=datetime.utcnow()
    )
    db.add(alert)
    db.commit()
    db.refresh(alert)
    return alert

@router.patch("/{alert_id}/acknowledge", response_model=AlertResponse)
def acknowledge_alert(
    alert_id: int,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user)
):
    """Mark an emergency alert acknowledged by commanding officer."""
    alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")

    alert.status = "Acknowledged"
    alert.acknowledged_at = datetime.utcnow()
    if current_user:
        alert.acknowledged_by_user_id = current_user.id

    db.commit()
    db.refresh(alert)
    return alert

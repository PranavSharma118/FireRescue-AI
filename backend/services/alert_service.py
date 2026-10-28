# ==========================================================
# File: services/alert_service.py
# Purpose: Rule-based hazard alert triggers and live sensor anomaly processing
# ==========================================================

from datetime import datetime
from typing import List
from sqlalchemy.orm import Session
from models import Alert

class AlertService:
    @staticmethod
    def evaluate_sensor_anomaly(
        db: Session,
        incident_id: int,
        sensor_code: str,
        temperature: float,
        smoke_obscuration: float,
        co_ppm: int
    ) -> List[Alert]:
        """Trigger instant critical alerts if temperature or smoke thresholds are breached."""
        new_alerts = []

        if temperature and temperature >= 50.0:
            alert = Alert(
                incident_id=incident_id,
                title="Critical Thermal Warning",
                description=f"Sensor {sensor_code} registered {temperature}°C ambient heat",
                details="Thermal flashover threshold approaching",
                severity="Critical",
                status="Active",
                detected_source=sensor_code,
                confidence_pct=98.0,
                created_at=datetime.utcnow()
            )
            db.add(alert)
            new_alerts.append(alert)

        if smoke_obscuration and smoke_obscuration >= 75.0:
            alert = Alert(
                incident_id=incident_id,
                title="Dense Smoke Obscuration",
                description=f"Sensor {sensor_code} detected {smoke_obscuration}% particulate density",
                details="Zero-visibility evacuation hazard",
                severity="Critical",
                status="Active",
                detected_source=sensor_code,
                confidence_pct=95.0,
                created_at=datetime.utcnow()
            )
            db.add(alert)
            new_alerts.append(alert)

        if co_ppm and co_ppm >= 100:
            alert = Alert(
                incident_id=incident_id,
                title="Toxic Carbon Monoxide Hazard",
                description=f"Sensor {sensor_code} detected {co_ppm} ppm CO",
                details="SCBA gear mandatory for entry crews",
                severity="Warning",
                status="Active",
                detected_source=sensor_code,
                confidence_pct=92.0,
                created_at=datetime.utcnow()
            )
            db.add(alert)
            new_alerts.append(alert)

        if new_alerts:
            db.commit()

        return new_alerts

alert_service = AlertService()

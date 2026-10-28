# ==========================================================
# File: services/incident_service.py
# Purpose: Incident management, state transitions, and automated risk association
# ==========================================================

from datetime import datetime
from sqlalchemy.orm import Session
from models import Incident, Alert, Prediction
from services.prediction_service import prediction_service

class IncidentService:
    @staticmethod
    def generate_next_code(db: Session) -> str:
        """Generate unique incremented incident code, e.g. '#105'"""
        last_incident = db.query(Incident).order_by(Incident.id.desc()).first()
        if last_incident and last_incident.incident_code.startswith("#"):
            try:
                num = int(last_incident.incident_code.replace("#", ""))
                return f"#{num + 1}"
            except ValueError:
                pass
        return f"#{100 + db.query(Incident).count() + 1}"

    @staticmethod
    def create_incident_with_ai(db: Session, incident_data, user_id: int = None) -> Incident:
        """Create incident and automatically generate initial AI predictions and hazard alerts"""
        code = incident_data.incident_code or IncidentService.generate_next_code(db)

        # 1. Calculate AI prediction metrics
        ai_metrics = prediction_service.calculate_fire_spread(
            temperature=float(incident_data.temperature_celsius or 45.0),
            smoke_density=float(incident_data.smoke_density_pct or 85),
            co_ppm=100,
            wind_direction=incident_data.wind_conditions or "East 12 km/h",
            floor=incident_data.floor_number
        )

        incident = Incident(
            incident_code=code,
            building_id=incident_data.building_id,
            origin_zone_id=getattr(incident_data, 'origin_zone_id', None),
            floor_number=incident_data.floor_number,
            location_description=incident_data.location_description,
            severity=incident_data.severity,
            status="Active",
            people_at_risk=incident_data.people_at_risk,
            temperature_celsius=incident_data.temperature_celsius,
            smoke_density_pct=incident_data.smoke_density_pct,
            gas_level=incident_data.gas_level,
            wind_conditions=incident_data.wind_conditions,
            estimated_spread_window=ai_metrics["estimated_spread_window"],
            ai_spread_risk_score=ai_metrics["spread_risk_score"],
            notes=incident_data.notes,
            reported_by_user_id=user_id,
            created_at=datetime.utcnow(),
        )
        db.add(incident)
        db.commit()
        db.refresh(incident)

        # 2. Add AI Prediction Record
        prediction = Prediction(
            incident_id=incident.id,
            spread_risk_score=ai_metrics["spread_risk_score"],
            estimated_spread_minutes=ai_metrics["estimated_spread_minutes"],
            predicted_spread_direction=ai_metrics["predicted_spread_direction"],
            flashover_probability_pct=ai_metrics["flashover_probability_pct"],
            structural_collapse_risk=ai_metrics["structural_collapse_risk"],
            recommended_entry_point=ai_metrics["recommended_entry_point"],
            confidence_score=ai_metrics["confidence_score"],
            model_version=ai_metrics["model_version"],
            created_at=datetime.utcnow()
        )
        db.add(prediction)

        # 3. Add Critical Alert
        alert = Alert(
            incident_id=incident.id,
            title=f"Incident Registered: {incident.incident_code}",
            description=f"{incident.location_description} (Severity: {incident.severity})",
            details=f"AI Risk Index: {ai_metrics['spread_risk_score']}% | Est Spread: {ai_metrics['estimated_spread_window']}",
            severity="Critical" if incident.severity == "High" else "Warning",
            status="Active",
            detected_source="Incident Command Dispatcher",
            confidence_pct=96.0,
            created_at=datetime.utcnow()
        )
        db.add(alert)
        db.commit()

        return incident

incident_service = IncidentService()

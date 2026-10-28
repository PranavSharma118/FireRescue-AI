# ==========================================================
# File: routes/predictions.py
# Purpose: AI fire spread predictions, risk gauge scores, and vector estimation
# ==========================================================

from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Prediction, Incident
from schemas import PredictionRequest, PredictionResponse
from services.prediction_service import prediction_service

router = APIRouter(prefix="/predictions", tags=["AI Predictions"])

@router.get("/latest/{incident_id}", response_model=PredictionResponse)
def get_latest_prediction(incident_id: int, db: Session = Depends(get_db)):
    """Retrieve most recent AI fire spread risk prediction for an incident."""
    prediction = db.query(Prediction).filter(
        Prediction.incident_id == incident_id
    ).order_by(Prediction.created_at.desc()).first()

    if not prediction:
        # Generate and save dynamically if not present
        incident = db.query(Incident).filter(Incident.id == incident_id).first()
        temp = float(incident.temperature_celsius or 45.0) if incident else 45.0
        smoke = float(incident.smoke_density_pct or 85) if incident else 85.0

        ai_calc = prediction_service.calculate_fire_spread(temperature=temp, smoke_density=smoke)
        prediction = Prediction(
            incident_id=incident_id,
            spread_risk_score=ai_calc["spread_risk_score"],
            estimated_spread_minutes=ai_calc["estimated_spread_minutes"],
            predicted_spread_direction=ai_calc["predicted_spread_direction"],
            flashover_probability_pct=ai_calc["flashover_probability_pct"],
            structural_collapse_risk=ai_calc["structural_collapse_risk"],
            recommended_entry_point=ai_calc["recommended_entry_point"],
            confidence_score=ai_calc["confidence_score"],
            model_version=ai_calc["model_version"],
            created_at=datetime.utcnow()
        )
        db.add(prediction)
        db.commit()
        db.refresh(prediction)

    return prediction

@router.post("/predict", response_model=PredictionResponse)
def compute_prediction(request: PredictionRequest, db: Session = Depends(get_db)):
    """Run real-time AI prediction on telemetry parameters."""
    ai_calc = prediction_service.calculate_fire_spread(
        temperature=request.temperature,
        smoke_density=request.smoke_density,
        co_ppm=request.co_level or 100,
        wind_direction=request.wind_direction or "East",
        floor=request.building_floor
    )

    prediction = Prediction(
        incident_id=request.incident_id,
        spread_risk_score=ai_calc["spread_risk_score"],
        estimated_spread_minutes=ai_calc["estimated_spread_minutes"],
        predicted_spread_direction=ai_calc["predicted_spread_direction"],
        flashover_probability_pct=ai_calc["flashover_probability_pct"],
        structural_collapse_risk=ai_calc["structural_collapse_risk"],
        recommended_entry_point=ai_calc["recommended_entry_point"],
        confidence_score=ai_calc["confidence_score"],
        model_version=ai_calc["model_version"],
        created_at=datetime.utcnow()
    )
    db.add(prediction)

    # Sync back to incident record
    incident = db.query(Incident).filter(Incident.id == request.incident_id).first()
    if incident:
        incident.ai_spread_risk_score = ai_calc["spread_risk_score"]
        incident.estimated_spread_window = ai_calc["estimated_spread_window"]

    db.commit()
    db.refresh(prediction)
    return prediction

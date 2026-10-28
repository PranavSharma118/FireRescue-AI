# ==========================================================
# File: tests/test_incidents.py
# Purpose: Test API endpoints for incidents and prediction services
# ==========================================================

from services.prediction_service import prediction_service

def test_prediction_service_risk_calculation():
    """Verify prediction service computes expected high-risk spread score for chemical fire."""
    result = prediction_service.calculate_fire_spread(
        temperature=85.0,
        smoke_density=92.0,
        co_ppm=180,
        wind_direction="East 14 km/h"
    )

    assert result["spread_risk_score"] > 70
    assert "East Wing" in result["predicted_spread_direction"]
    assert "West Entrance" in result["recommended_entry_point"]
    assert result["flashover_probability_pct"] >= 80

def test_prediction_service_safe_baseline():
    """Verify prediction service gives low score for normal ambient conditions."""
    result = prediction_service.calculate_fire_spread(
        temperature=22.0,
        smoke_density=5.0,
        co_ppm=10
    )

    assert result["spread_risk_score"] <= 35
    assert result["flashover_probability_pct"] < 30

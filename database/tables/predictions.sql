-- ==========================================================
-- Table: predictions
-- Purpose: AI risk predictions, fire spread vector calculations, and flashover probabilities
-- ==========================================================

CREATE TABLE IF NOT EXISTS predictions (
    id SERIAL PRIMARY KEY,
    incident_id INT NOT NULL,
    spread_risk_score INT NOT NULL, -- e.g. 87%
    estimated_spread_minutes INT DEFAULT 15,
    predicted_spread_direction VARCHAR(100) DEFAULT 'East Wing',
    flashover_probability_pct INT DEFAULT 78,
    structural_collapse_risk VARCHAR(50) DEFAULT 'Low',
    recommended_entry_point VARCHAR(100) DEFAULT 'West Entrance (Staircase A)',
    confidence_score NUMERIC(5, 2) DEFAULT 94.0,
    model_version VARCHAR(50) DEFAULT 'FireRescue-YOLOv8-ThermaNet-v2.4',
    raw_telemetry_snapshot JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_predictions_incident ON predictions(incident_id);
CREATE INDEX IF NOT EXISTS idx_predictions_created ON predictions(created_at DESC);

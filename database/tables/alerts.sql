-- ==========================================================
-- Table: alerts
-- Purpose: Real-time emergency hazard detections, smoke blockages, and critical notifications
-- ==========================================================

CREATE TABLE IF NOT EXISTS alerts (
    id SERIAL PRIMARY KEY,
    incident_id INT,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    details VARCHAR(255),
    severity VARCHAR(50) NOT NULL DEFAULT 'Critical', -- 'Critical', 'Warning', 'Safe', 'Info'
    status VARCHAR(50) NOT NULL DEFAULT 'Active', -- 'Active', 'Acknowledged', 'Dismissed'
    detected_source VARCHAR(100) DEFAULT 'CCTV AI Camera 1',
    confidence_pct NUMERIC(5, 2) DEFAULT 94.0,
    acknowledged_by_user_id INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    acknowledged_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_alerts_incident ON alerts(incident_id);
CREATE INDEX IF NOT EXISTS idx_alerts_status ON alerts(status);
CREATE INDEX IF NOT EXISTS idx_alerts_created ON alerts(created_at DESC);

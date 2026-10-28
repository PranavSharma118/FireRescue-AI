-- ==========================================================
-- Table: incidents
-- Purpose: Active fire emergency incidents, severity, and status lifecycle
-- ==========================================================

CREATE TABLE IF NOT EXISTS incidents (
    id SERIAL PRIMARY KEY,
    incident_code VARCHAR(50) UNIQUE NOT NULL, -- e.g. '#104'
    building_id INT NOT NULL,
    origin_zone_id INT,
    floor_number INT NOT NULL,
    location_description VARCHAR(255) NOT NULL, -- e.g., 'Floor 3, Room 304'
    severity VARCHAR(50) NOT NULL DEFAULT 'High', -- 'Critical', 'High', 'Medium', 'Low'
    status VARCHAR(50) NOT NULL DEFAULT 'Active', -- 'Active', 'Contained', 'Resolved'
    people_at_risk INT NOT NULL DEFAULT 0,
    temperature_celsius NUMERIC(5, 2) DEFAULT 45.0,
    smoke_density_pct INT DEFAULT 89,
    gas_level VARCHAR(50) DEFAULT 'Moderate',
    wind_conditions VARCHAR(100) DEFAULT 'East 12 km/h',
    estimated_spread_window VARCHAR(100) DEFAULT '10 - 15 mins',
    ai_spread_risk_score INT DEFAULT 87,
    notes TEXT,
    reported_by_user_id INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_incidents_code ON incidents(incident_code);
CREATE INDEX IF NOT EXISTS idx_incidents_status ON incidents(status);
CREATE INDEX IF NOT EXISTS idx_incidents_severity ON incidents(severity);

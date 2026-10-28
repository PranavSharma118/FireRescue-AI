-- ==========================================================
-- Table: zones
-- Purpose: Building rooms, corridors, staircases, and assigned risk zones
-- ==========================================================

CREATE TABLE IF NOT EXISTS zones (
    id SERIAL PRIMARY KEY,
    building_id INT NOT NULL,
    floor_number INT NOT NULL,
    zone_code VARCHAR(50) NOT NULL, -- e.g., '301', '302', '303', 'Staircase A'
    zone_name VARCHAR(150) NOT NULL, -- e.g., '303 Lab (Chemical Storage)'
    zone_type VARCHAR(50) NOT NULL DEFAULT 'Room', -- 'Room', 'Lab', 'Corridor', 'Staircase', 'Exit'
    current_risk_level VARCHAR(50) NOT NULL DEFAULT 'Safe', -- 'Critical', 'High', 'Moderate', 'Low', 'Safe'
    capacity INT DEFAULT 30,
    current_occupants INT DEFAULT 0,
    is_evacuation_route BOOLEAN DEFAULT FALSE,
    is_blocked BOOLEAN DEFAULT FALSE,
    blockage_reason VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_zones_building_floor ON zones(building_id, floor_number);
CREATE INDEX IF NOT EXISTS idx_zones_risk ON zones(current_risk_level);

-- ==========================================================
-- Table: buildings
-- Purpose: Campus building architecture, floor layouts, and master metadata
-- ==========================================================

CREATE TABLE IF NOT EXISTS buildings (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    code VARCHAR(50) NOT NULL UNIQUE,
    campus VARCHAR(100) DEFAULT 'Main Campus',
    address TEXT,
    floors_count INT NOT NULL DEFAULT 4,
    basements_count INT NOT NULL DEFAULT 1,
    total_occupancy_capacity INT NOT NULL DEFAULT 500,
    sprinkler_system_active BOOLEAN DEFAULT TRUE,
    fire_alarm_system_active BOOLEAN DEFAULT TRUE,
    ventilation_system_status VARCHAR(50) DEFAULT 'Normal',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_buildings_name ON buildings(name);

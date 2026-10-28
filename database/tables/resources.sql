-- ==========================================================
-- Table: resources
-- Purpose: Firefighters squads, apparatus vehicles, water tenders, and tactical equipment
-- ==========================================================

CREATE TABLE IF NOT EXISTS resources (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    resource_type VARCHAR(50) NOT NULL, -- 'personnel', 'vehicle', 'equipment'
    unit_category VARCHAR(100), -- 'Entry Squad', 'Engine Tender', 'Ladder Truck', 'SCBA', 'Thermal Drone'
    status VARCHAR(50) NOT NULL DEFAULT 'Available', -- 'Available', 'Deployed', 'En-Route', 'Maintenance'
    current_location VARCHAR(150),
    assigned_incident_id INT,
    capacity_or_specs JSONB, -- e.g. {"water_level": "88%", "pressure_bar": 12, "reach_meters": 32}
    contact_number VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_resources_type ON resources(resource_type);
CREATE INDEX IF NOT EXISTS idx_resources_status ON resources(status);

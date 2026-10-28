-- ==========================================================
-- Table: sensor_readings
-- Purpose: Continuous telemetry from IoT smoke, optical, thermal, and CO gas detectors
-- ==========================================================

CREATE TABLE IF NOT EXISTS sensor_readings (
    id SERIAL PRIMARY KEY,
    incident_id INT,
    building_id INT NOT NULL,
    zone_id INT,
    sensor_code VARCHAR(100) NOT NULL, -- e.g. 'T-304-TEMP', 'SMK-CORR-3B'
    sensor_type VARCHAR(50) NOT NULL, -- 'thermal', 'smoke_optical', 'co_gas', 'flame_detector'
    temperature_celsius NUMERIC(5, 2),
    smoke_obscuration_pct NUMERIC(5, 2),
    co_ppm INT,
    heat_flux_kw_m2 NUMERIC(5, 2),
    is_anomaly BOOLEAN DEFAULT FALSE,
    reading_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sensor_readings_incident ON sensor_readings(incident_id);
CREATE INDEX IF NOT EXISTS idx_sensor_readings_timestamp ON sensor_readings(reading_timestamp DESC);

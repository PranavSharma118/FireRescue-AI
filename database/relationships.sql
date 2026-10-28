-- ==========================================================
-- Relationships, Foreign Keys & Constraints
-- File: relationships.sql
-- ==========================================================

-- 1. Zones link to Buildings
ALTER TABLE zones
    DROP CONSTRAINT IF EXISTS fk_zones_building,
    ADD CONSTRAINT fk_zones_building
    FOREIGN KEY (building_id) REFERENCES buildings(id)
    ON DELETE CASCADE;

-- 2. Incidents link to Buildings & Origin Zone & Reporter
ALTER TABLE incidents
    DROP CONSTRAINT IF EXISTS fk_incidents_building,
    ADD CONSTRAINT fk_incidents_building
    FOREIGN KEY (building_id) REFERENCES buildings(id)
    ON DELETE RESTRICT;

ALTER TABLE incidents
    DROP CONSTRAINT IF EXISTS fk_incidents_zone,
    ADD CONSTRAINT fk_incidents_zone
    FOREIGN KEY (origin_zone_id) REFERENCES zones(id)
    ON DELETE SET NULL;

ALTER TABLE incidents
    DROP CONSTRAINT IF EXISTS fk_incidents_reporter,
    ADD CONSTRAINT fk_incidents_reporter
    FOREIGN KEY (reported_by_user_id) REFERENCES users(id)
    ON DELETE SET NULL;

-- 3. Sensor readings link to Incidents, Buildings, and Zones
ALTER TABLE sensor_readings
    DROP CONSTRAINT IF EXISTS fk_readings_incident,
    ADD CONSTRAINT fk_readings_incident
    FOREIGN KEY (incident_id) REFERENCES incidents(id)
    ON DELETE CASCADE;

ALTER TABLE sensor_readings
    DROP CONSTRAINT IF EXISTS fk_readings_building,
    ADD CONSTRAINT fk_readings_building
    FOREIGN KEY (building_id) REFERENCES buildings(id)
    ON DELETE CASCADE;

ALTER TABLE sensor_readings
    DROP CONSTRAINT IF EXISTS fk_readings_zone,
    ADD CONSTRAINT fk_readings_zone
    FOREIGN KEY (zone_id) REFERENCES zones(id)
    ON DELETE SET NULL;

-- 4. Resources link to active incident assignment
ALTER TABLE resources
    DROP CONSTRAINT IF EXISTS fk_resources_incident,
    ADD CONSTRAINT fk_resources_incident
    FOREIGN KEY (assigned_incident_id) REFERENCES incidents(id)
    ON DELETE SET NULL;

-- 5. Predictions link to Incident
ALTER TABLE predictions
    DROP CONSTRAINT IF EXISTS fk_predictions_incident,
    ADD CONSTRAINT fk_predictions_incident
    FOREIGN KEY (incident_id) REFERENCES incidents(id)
    ON DELETE CASCADE;

-- 6. Alerts link to Incident & User who acknowledged
ALTER TABLE alerts
    DROP CONSTRAINT IF EXISTS fk_alerts_incident,
    ADD CONSTRAINT fk_alerts_incident
    FOREIGN KEY (incident_id) REFERENCES incidents(id)
    ON DELETE CASCADE;

ALTER TABLE alerts
    DROP CONSTRAINT IF EXISTS fk_alerts_user,
    ADD CONSTRAINT fk_alerts_user
    FOREIGN KEY (acknowledged_by_user_id) REFERENCES users(id)
    ON DELETE SET NULL;

-- 7. Recommendations link to Incident & Authorizing Commander
ALTER TABLE recommendations
    DROP CONSTRAINT IF EXISTS fk_recommendations_incident,
    ADD CONSTRAINT fk_recommendations_incident
    FOREIGN KEY (incident_id) REFERENCES incidents(id)
    ON DELETE CASCADE;

ALTER TABLE recommendations
    DROP CONSTRAINT IF EXISTS fk_recommendations_user,
    ADD CONSTRAINT fk_recommendations_user
    FOREIGN KEY (verified_by_user_id) REFERENCES users(id)
    ON DELETE SET NULL;

-- ==========================================================
-- Master Schema for FireRescue AI
-- Database: firerescue_AI
-- ==========================================================

-- Enable useful extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users
\ir tables/users.sql

-- 2. Buildings
\ir tables/buildings.sql

-- 3. Zones
\ir tables/zones.sql

-- 4. Incidents
\ir tables/incidents.sql

-- 5. Sensor Readings
\ir tables/sensor_readings.sql

-- 6. Resources
\ir tables/resources.sql

-- 7. Predictions
\ir tables/predictions.sql

-- 8. Alerts
\ir tables/alerts.sql

-- 9. Recommendations
\ir tables/recommendations.sql

-- 10. Relationships & Constraints
\ir relationships.sql

-- 11. Initial Demo Seed Data
\ir seed_data.sql

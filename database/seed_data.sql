-- ==========================================================
-- Demo & Initial Seed Data for FireRescue AI
-- File: seed_data.sql
-- ==========================================================

-- 1. Seed Users (passwords hashed for 'fire rescue123')
INSERT INTO users (badge_number, full_name, email, hashed_password, role, rank, department, station, call_sign, phone_number)
VALUES
('FD-709', 'Commander Rajesh Varma', 'commander.varma@firerescue.gov', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Incident Commander', 'Chief Commander', 'Fire Department', 'Station 12 - Metro Command', 'Red Leader', '+91 98112-44101'),
('FD-401', 'Squad Leader Amit Roy', 'amit.roy@firerescue.gov', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Firefighter', 'Senior Firefighter', 'Fire Department', 'Tactical Squad Alpha', 'Alpha-1', '+91 98112-44102'),
('FD-502', 'Vikas Sharma', 'vikas.sharma@firerescue.gov', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Firefighter', 'Search & Rescue Specialist', 'Fire Department', 'Station 12', 'Bravo-2', '+91 98112-44103')
ON CONFLICT (badge_number) DO NOTHING;

-- 2. Seed Buildings
INSERT INTO buildings (name, code, campus, address, floors_count, total_occupancy_capacity, sprinkler_system_active, fire_alarm_system_active)
VALUES
('Academic Block', 'ACAD-01', 'North Campus', 'Zone 1 Engineering Quadrangle', 4, 600, TRUE, TRUE),
('Hostel Block', 'HST-01', 'East Campus', 'Student Residential Sector 4', 3, 350, TRUE, TRUE),
('Admin Block', 'ADM-01', 'Central Campus', 'Main Administration Plaza', 3, 200, TRUE, TRUE),
('Science Complex', 'SCI-02', 'North Campus', 'Advanced Research Wing', 5, 450, TRUE, TRUE),
('Library Complex', 'LIB-01', 'Central Campus', 'Central Information Center', 2, 300, TRUE, TRUE)
ON CONFLICT (name) DO NOTHING;

-- 3. Seed Zones (Academic Block - Floor 3 focus matching Blueprint UI)
INSERT INTO zones (building_id, floor_number, zone_code, zone_name, zone_type, current_risk_level, capacity, current_occupants, is_evacuation_route, is_blocked, blockage_reason)
VALUES
(1, 3, '301', '301 Class Room', 'Room', 'Moderate', 40, 14, FALSE, FALSE, NULL),
(1, 3, '302', '302 Lab', 'Lab', 'High', 30, 0, FALSE, FALSE, NULL),
(1, 3, '303', '303 Lab (Chemical Fire Origin)', 'Lab', 'Critical', 25, 0, FALSE, TRUE, 'Active chemical fire origin core'),
(1, 3, '305', '305 Office', 'Room', 'Moderate', 15, 4, FALSE, FALSE, NULL),
(1, 3, '306', '306 Class Room', 'Room', 'Low', 40, 18, FALSE, FALSE, NULL),
(1, 3, '307', '307 Class Room', 'Room', 'Safe', 40, 22, FALSE, FALSE, NULL),
(1, 3, '308', '308 Storage', 'Room', 'Safe', 10, 0, FALSE, FALSE, NULL),
(1, 3, 'STAIR-A', 'Staircase A (West Wing)', 'Staircase', 'Safe', 100, 0, TRUE, FALSE, NULL),
(1, 3, 'STAIR-B', 'Staircase B (East Wing)', 'Staircase', 'Critical', 100, 0, FALSE, TRUE, 'High smoke concentration and zero visibility')
ON CONFLICT DO NOTHING;

-- 4. Seed Incidents
INSERT INTO incidents (id, incident_code, building_id, floor_number, location_description, severity, status, people_at_risk, temperature_celsius, smoke_density_pct, gas_level, wind_conditions, estimated_spread_window, ai_spread_risk_score, notes, reported_by_user_id)
VALUES
(104, '#104', 1, 3, 'Floor 3, Room 304', 'High', 'Active', 42, 45.0, 89, 'Moderate', 'East 12 km/h', '10 - 15 mins', 87, 'Primary fire outbreak identified in chemical storage shelf. Toxic fumes spreading towards East wing corridors. Ventilation shutdown initiated.', 1),
(103, '#103', 2, 1, 'Floor 1, Kitchen', 'Medium', 'Contained', 12, 32.0, 18, 'Normal', 'North 8 km/h', 'Controlled', 34, 'Kitchen deep fryer flareup suppressed by team Bravo using dry powder extinguisher.', 2),
(102, '#102', 3, 2, 'Floor 2, Room 201', 'Low', 'Resolved', 6, 24.0, 0, 'Normal', 'Calm', 'None', 12, 'Electrical short circuit safely isolated by campus facility crew. Thermal scan verified clear.', 1)
ON CONFLICT (incident_code) DO NOTHING;

-- 5. Seed Sensor Readings for Incident #104
INSERT INTO sensor_readings (incident_id, building_id, zone_id, sensor_code, sensor_type, temperature_celsius, smoke_obscuration_pct, co_ppm, is_anomaly)
VALUES
(104, 1, 3, 'T-304-TEMP', 'thermal', 92.5, 98.0, 180, TRUE),
(104, 1, 2, 'T-302-TEMP', 'thermal', 48.0, 76.0, 85, TRUE),
(104, 1, 8, 'SMK-STAIR-A', 'smoke_optical', 22.0, 0.0, 5, FALSE),
(104, 1, 9, 'SMK-STAIR-B', 'smoke_optical', 68.0, 94.0, 240, TRUE)
ON CONFLICT DO NOTHING;

-- 6. Seed Resources
INSERT INTO resources (name, resource_type, unit_category, status, current_location, assigned_incident_id, capacity_or_specs, contact_number)
VALUES
('Commander Rajesh Varma', 'personnel', 'Incident Control', 'Deployed', 'Command Post Alpha', 104, '{"role": "Incident Commander", "call_sign": "Red Leader"}', '+91 98112-44101'),
('Squad Leader Amit Roy', 'personnel', 'Entry Team Alpha', 'Deployed', 'Floor 2 Staging (West Entrance)', 104, '{"squad_size": 4, "scba_ready": true}', '+91 98112-44102'),
('Vikas Sharma', 'personnel', 'Search & Rescue 1', 'Deployed', 'Floor 4 East Wing', 104, '{"squad_size": 3, "thermal_cam": true}', '+91 98112-44103'),
('Rescue Engine 01 (Water Tender)', 'vehicle', 'Engine Tender', 'Deployed', 'Hydrant Gate 2', 104, '{"water_level": "88%", "pressure_bar": 12, "flow_rate": "2400 L/min"}', '+91 98112-44110'),
('Ladder Truck 03 (32m Hydraulic)', 'vehicle', 'Ladder Truck', 'Deployed', 'Academic Courtyard', 104, '{"reach_meters": 32, "platform_capacity": 4}', '+91 98112-44111'),
('High-Expansion Foam Unit 02', 'vehicle', 'Specialized Unit', 'Available', 'Main Entrance', NULL, '{"tank_level": "95%", "type": "Class B Foam"}', '+91 98112-44112'),
('Thermal Drone Recon Unit', 'equipment', 'Thermal Drone', 'Deployed', 'Hovering over Academic Block (45m)', 104, '{"model": "SkyScout Pro 4K", "battery": "92%", "altitude_m": 45}', '+91 98112-44120')
ON CONFLICT DO NOTHING;

-- 7. Seed Predictions for Incident #104
INSERT INTO predictions (incident_id, spread_risk_score, estimated_spread_minutes, predicted_spread_direction, flashover_probability_pct, structural_collapse_risk, recommended_entry_point, confidence_score)
VALUES
(104, 87, 12, 'East Wing (Rooms 305-308)', 82, 'Low', 'West Entrance (Staircase A)', 94.0)
ON CONFLICT DO NOTHING;

-- 8. Seed Alerts
INSERT INTO alerts (incident_id, title, description, details, severity, status, detected_source, confidence_pct)
VALUES
(104, 'Fire detected', 'Room 304, Floor 3', 'Confidence: 94%', 'Critical', 'Active', 'CCTV Cam 1 (Room 304)', 94.0),
(104, 'Smoke detected', 'Corridor, Floor 3', 'Confidence: 89%', 'Critical', 'Active', 'CCTV Cam 2 (Corridor)', 89.0),
(104, 'Staircase B blocked', 'High smoke level', 'Impassable route (CO > 200ppm)', 'Warning', 'Active', 'CCTV Cam 4 (Staircase B)', 92.0),
(104, 'Staircase A is clear', 'Safe for evacuation', 'Airflow positive pressure active', 'Safe', 'Active', 'CCTV Cam 3 (Staircase A)', 98.0),
(104, 'Temperature rising', 'Floor 3 (45°C)', 'Thermal gradient climbing +2°C/min', 'Warning', 'Active', 'Telemetry Sensor T-304', 96.0)
ON CONFLICT DO NOTHING;

-- 9. Seed Recommendations
INSERT INTO recommendations (incident_id, action_type, title, recommendation_text, priority_order, is_verified, execution_status)
VALUES
(104, 'entry_routing', 'Deploy firefighters from West Entrance', 'Deploy entry teams strictly via West Entrance (Staircase A) where positive pressure ventilation is operational.', 1, TRUE, 'Authorized'),
(104, 'floor_evacuation', 'Evacuate Floor 4 -> Floor 3 -> Floor 2', 'Priority evacuation order: Floor 4 top level first due to upward smoke draft, followed by Floor 3 and Floor 2.', 2, TRUE, 'Authorized'),
(104, 'entry_routing', 'Use Staircase A for evacuation', 'Direct all civilian occupants down Staircase A to the ground safe assembly zone.', 3, TRUE, 'Authorized'),
(104, 'suppression', 'Monitor East Wing for rapid spread', 'Thermal gradient shows heat radiation moving along corridor ceiling toward room 305.', 4, FALSE, 'Pending'),
(104, 'ventilation', 'Activate sprinkler system (if available)', 'Trigger zone 3 deluge suppressors if flashover index breaches 85%.', 5, FALSE, 'Pending')
ON CONFLICT DO NOTHING;

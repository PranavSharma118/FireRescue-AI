-- ==========================================================
-- Table: recommendations
-- Purpose: Tactical AI recommendations, evacuation order priorities, and Commander verified actions
-- ==========================================================

CREATE TABLE IF NOT EXISTS recommendations (
    id SERIAL PRIMARY KEY,
    incident_id INT NOT NULL,
    action_type VARCHAR(100) NOT NULL, -- 'entry_routing', 'floor_evacuation', 'ventilation', 'suppression'
    title VARCHAR(200) NOT NULL,
    recommendation_text TEXT NOT NULL,
    priority_order INT NOT NULL DEFAULT 1,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    verified_by_user_id INT,
    verified_at TIMESTAMP WITH TIME ZONE,
    execution_status VARCHAR(50) DEFAULT 'Pending', -- 'Pending', 'Authorized', 'Executed', 'Rejected'
    commander_directives_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_recommendations_incident ON recommendations(incident_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_verified ON recommendations(is_verified);

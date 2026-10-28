-- ==========================================================
-- Table: users
-- Purpose: Firefighters, Incident Commanders, and Admins
-- ==========================================================

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    badge_number VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Firefighter', -- 'Incident Commander', 'Firefighter', 'Dispatcher', 'Admin'
    rank VARCHAR(100) DEFAULT 'Lead Officer',
    department VARCHAR(100) DEFAULT 'Fire Department',
    station VARCHAR(100) DEFAULT 'Station 12 - Metro Command',
    call_sign VARCHAR(50) DEFAULT 'Red Leader',
    phone_number VARCHAR(30),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_badge ON users(badge_number);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

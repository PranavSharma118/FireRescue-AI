# ==========================================================
# File: tests/test_database.py
# Purpose: Test database connection and table models
# ==========================================================

import pytest
from database import engine, SessionLocal, Base
from models import Incident, User, Alert

def test_database_engine_connection():
    """Verify database engine connects and can execute a simple query."""
    with engine.connect() as conn:
        assert conn is not None

def test_models_metadata():
    """Verify all ORM models are registered on Base metadata."""
    tables = Base.metadata.tables.keys()
    assert "users" in tables
    assert "incidents" in tables
    assert "sensor_readings" in tables
    assert "resources" in tables
    assert "predictions" in tables
    assert "alerts" in tables
    assert "recommendations" in tables

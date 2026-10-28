# ==========================================================
# File: models.py
# Purpose: SQLAlchemy ORM models matching database tables
# ==========================================================

from datetime import datetime
from sqlalchemy import (
    Column, Integer, String, Boolean, Numeric, Text, DateTime, ForeignKey, JSON
)
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    badge_number = Column(String(50), unique=True, nullable=False, index=True)
    full_name = Column(String(150), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False, default="Firefighter", index=True)
    rank = Column(String(100), default="Lead Officer")
    department = Column(String(100), default="Fire Department")
    station = Column(String(100), default="Station 12 - Metro Command")
    call_sign = Column(String(50), default="Red Leader")
    phone_number = Column(String(30), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    incidents_reported = relationship("Incident", back_populates="reporter")


class Building(Base):
    __tablename__ = "buildings"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), unique=True, nullable=False, index=True)
    code = Column(String(50), unique=True, nullable=False)
    campus = Column(String(100), default="Main Campus")
    address = Column(Text, nullable=True)
    floors_count = Column(Integer, default=4)
    basements_count = Column(Integer, default=1)
    total_occupancy_capacity = Column(Integer, default=500)
    sprinkler_system_active = Column(Boolean, default=True)
    fire_alarm_system_active = Column(Boolean, default=True)
    ventilation_system_status = Column(String(50), default="Normal")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    zones = relationship("Zone", back_populates="building", cascade="all, delete-orphan")
    incidents = relationship("Incident", back_populates="building")
    sensor_readings = relationship("SensorReading", back_populates="building")


class Zone(Base):
    __tablename__ = "zones"

    id = Column(Integer, primary_key=True, index=True)
    building_id = Column(Integer, ForeignKey("buildings.id", ondelete="CASCADE"), nullable=False, index=True)
    floor_number = Column(Integer, nullable=False)
    zone_code = Column(String(50), nullable=False)  # e.g., '301', '302', '303', 'Staircase A'
    zone_name = Column(String(150), nullable=False)
    zone_type = Column(String(50), default="Room")  # 'Room', 'Lab', 'Corridor', 'Staircase', 'Exit'
    current_risk_level = Column(String(50), default="Safe", index=True)  # 'Critical', 'High', 'Moderate', 'Low', 'Safe'
    capacity = Column(Integer, default=30)
    current_occupants = Column(Integer, default=0)
    is_evacuation_route = Column(Boolean, default=False)
    is_blocked = Column(Boolean, default=False)
    blockage_reason = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    building = relationship("Building", back_populates="zones")
    incidents_origin = relationship("Incident", back_populates="origin_zone")
    sensor_readings = relationship("SensorReading", back_populates="zone")


class Incident(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)
    incident_code = Column(String(50), unique=True, nullable=False, index=True)  # e.g., '#104'
    building_id = Column(Integer, ForeignKey("buildings.id"), nullable=False)
    origin_zone_id = Column(Integer, ForeignKey("zones.id"), nullable=True)
    floor_number = Column(Integer, nullable=False)
    location_description = Column(String(255), nullable=False)
    severity = Column(String(50), default="High", index=True)  # 'Critical', 'High', 'Medium', 'Low'
    status = Column(String(50), default="Active", index=True)  # 'Active', 'Contained', 'Resolved'
    people_at_risk = Column(Integer, default=0)
    temperature_celsius = Column(Numeric(5, 2), default=45.0)
    smoke_density_pct = Column(Integer, default=89)
    gas_level = Column(String(50), default="Moderate")
    wind_conditions = Column(String(100), default="East 12 km/h")
    estimated_spread_window = Column(String(100), default="10 - 15 mins")
    ai_spread_risk_score = Column(Integer, default=87)
    notes = Column(Text, nullable=True)
    reported_by_user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    resolved_at = Column(DateTime, nullable=True)

    # Relationships
    building = relationship("Building", back_populates="incidents")
    origin_zone = relationship("Zone", back_populates="incidents_origin")
    reporter = relationship("User", back_populates="incidents_reported")
    sensor_readings = relationship("SensorReading", back_populates="incident", cascade="all, delete-orphan")
    resources = relationship("Resource", back_populates="assigned_incident")
    predictions = relationship("Prediction", back_populates="incident", cascade="all, delete-orphan")
    alerts = relationship("Alert", back_populates="incident", cascade="all, delete-orphan")
    recommendations = relationship("Recommendation", back_populates="incident", cascade="all, delete-orphan")


class SensorReading(Base):
    __tablename__ = "sensor_readings"

    id = Column(Integer, primary_key=True, index=True)
    incident_id = Column(Integer, ForeignKey("incidents.id", ondelete="CASCADE"), nullable=True, index=True)
    building_id = Column(Integer, ForeignKey("buildings.id", ondelete="CASCADE"), nullable=False)
    zone_id = Column(Integer, ForeignKey("zones.id", ondelete="SET NULL"), nullable=True)
    sensor_code = Column(String(100), nullable=False)
    sensor_type = Column(String(50), nullable=False)  # 'thermal', 'smoke_optical', 'co_gas', 'flame_detector'
    temperature_celsius = Column(Numeric(5, 2), nullable=True)
    smoke_obscuration_pct = Column(Numeric(5, 2), nullable=True)
    co_ppm = Column(Integer, nullable=True)
    heat_flux_kw_m2 = Column(Numeric(5, 2), nullable=True)
    is_anomaly = Column(Boolean, default=False)
    reading_timestamp = Column(DateTime, default=datetime.utcnow, index=True)

    # Relationships
    incident = relationship("Incident", back_populates="sensor_readings")
    building = relationship("Building", back_populates="sensor_readings")
    zone = relationship("Zone", back_populates="sensor_readings")


class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    resource_type = Column(String(50), nullable=False, index=True)  # 'personnel', 'vehicle', 'equipment'
    unit_category = Column(String(100), nullable=True)  # 'Entry Squad', 'Engine Tender', etc.
    status = Column(String(50), default="Available", index=True)  # 'Available', 'Deployed', 'En-Route', 'Maintenance'
    current_location = Column(String(150), nullable=True)
    assigned_incident_id = Column(Integer, ForeignKey("incidents.id", ondelete="SET NULL"), nullable=True)
    capacity_or_specs = Column(JSON, nullable=True)
    contact_number = Column(String(50), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    assigned_incident = relationship("Incident", back_populates="resources")


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    incident_id = Column(Integer, ForeignKey("incidents.id", ondelete="CASCADE"), nullable=False, index=True)
    spread_risk_score = Column(Integer, nullable=False)  # e.g., 87
    estimated_spread_minutes = Column(Integer, default=15)
    predicted_spread_direction = Column(String(100), default="East Wing")
    flashover_probability_pct = Column(Integer, default=78)
    structural_collapse_risk = Column(String(50), default="Low")
    recommended_entry_point = Column(String(100), default="West Entrance (Staircase A)")
    confidence_score = Column(Numeric(5, 2), default=94.0)
    model_version = Column(String(50), default="FireRescue-YOLOv8-ThermaNet-v2.4")
    raw_telemetry_snapshot = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)

    # Relationships
    incident = relationship("Incident", back_populates="predictions")


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    incident_id = Column(Integer, ForeignKey("incidents.id", ondelete="CASCADE"), nullable=True, index=True)
    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=False)
    details = Column(String(255), nullable=True)
    severity = Column(String(50), default="Critical")  # 'Critical', 'Warning', 'Safe', 'Info'
    status = Column(String(50), default="Active", index=True)  # 'Active', 'Acknowledged', 'Dismissed'
    detected_source = Column(String(100), default="CCTV AI Camera 1")
    confidence_pct = Column(Numeric(5, 2), default=94.0)
    acknowledged_by_user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    acknowledged_at = Column(DateTime, nullable=True)

    # Relationships
    incident = relationship("Incident", back_populates="alerts")


class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    incident_id = Column(Integer, ForeignKey("incidents.id", ondelete="CASCADE"), nullable=False, index=True)
    action_type = Column(String(100), nullable=False)  # 'entry_routing', 'floor_evacuation', 'ventilation', etc.
    title = Column(String(200), nullable=False)
    recommendation_text = Column(Text, nullable=False)
    priority_order = Column(Integer, default=1)
    is_verified = Column(Boolean, default=False, index=True)
    verified_by_user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    verified_at = Column(DateTime, nullable=True)
    execution_status = Column(String(50), default="Pending")  # 'Pending', 'Authorized', 'Executed', 'Rejected'
    commander_directives_note = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    incident = relationship("Incident", back_populates="recommendations")

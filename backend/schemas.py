# ==========================================================
# File: schemas.py
# Purpose: Pydantic schemas for request validation & response serialization
# ==========================================================

from typing import Optional, List, Any, Dict
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field

# ----------------- Auth & Users -----------------
class UserBase(BaseModel):
    badge_number: str
    full_name: str
    email: EmailStr
    role: str = "Firefighter"
    rank: Optional[str] = "Lead Officer"
    department: Optional[str] = "Fire Department"
    station: Optional[str] = "Station 12 - Metro Command"
    call_sign: Optional[str] = "Red Leader"
    phone_number: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    badge_number: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# ----------------- Buildings & Zones -----------------
class ZoneResponse(BaseModel):
    id: int
    building_id: int
    floor_number: int
    zone_code: str
    zone_name: str
    zone_type: str
    current_risk_level: str
    capacity: int
    current_occupants: int
    is_evacuation_route: bool
    is_blocked: bool
    blockage_reason: Optional[str] = None

    class Config:
        from_attributes = True

class BuildingResponse(BaseModel):
    id: int
    name: str
    code: str
    campus: str
    floors_count: int
    total_occupancy_capacity: int
    sprinkler_system_active: bool
    fire_alarm_system_active: bool
    ventilation_system_status: str

    class Config:
        from_attributes = True

# ----------------- Incidents -----------------
class IncidentBase(BaseModel):
    building_id: int
    floor_number: int
    location_description: str
    severity: str = "High"
    people_at_risk: int = 0
    temperature_celsius: Optional[float] = 45.0
    smoke_density_pct: Optional[int] = 85
    gas_level: Optional[str] = "Moderate"
    wind_conditions: Optional[str] = "East 12 km/h"
    estimated_spread_window: Optional[str] = "10 - 15 mins"
    ai_spread_risk_score: Optional[int] = 87
    notes: Optional[str] = None

class IncidentCreate(IncidentBase):
    incident_code: Optional[str] = None

class IncidentUpdate(BaseModel):
    status: Optional[str] = None
    severity: Optional[str] = None
    people_at_risk: Optional[int] = None
    notes: Optional[str] = None
    temperature_celsius: Optional[float] = None
    smoke_density_pct: Optional[int] = None

class IncidentResponse(IncidentBase):
    id: int
    incident_code: str
    status: str
    created_at: datetime
    resolved_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# ----------------- Sensor Readings -----------------
class SensorReadingCreate(BaseModel):
    incident_id: Optional[int] = None
    building_id: int
    zone_id: Optional[int] = None
    sensor_code: str
    sensor_type: str
    temperature_celsius: Optional[float] = None
    smoke_obscuration_pct: Optional[float] = None
    co_ppm: Optional[int] = None
    heat_flux_kw_m2: Optional[float] = None
    is_anomaly: Optional[bool] = False

class SensorReadingResponse(SensorReadingCreate):
    id: int
    reading_timestamp: datetime

    class Config:
        from_attributes = True

# ----------------- Resources -----------------
class ResourceCreate(BaseModel):
    name: str
    resource_type: str
    unit_category: Optional[str] = None
    status: str = "Available"
    current_location: Optional[str] = None
    assigned_incident_id: Optional[int] = None
    capacity_or_specs: Optional[Dict[str, Any]] = None
    contact_number: Optional[str] = None

class ResourceUpdate(BaseModel):
    status: Optional[str] = None
    current_location: Optional[str] = None
    assigned_incident_id: Optional[int] = None

class ResourceResponse(ResourceCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# ----------------- AI Predictions -----------------
class PredictionRequest(BaseModel):
    incident_id: int
    temperature: float
    smoke_density: float
    co_level: Optional[int] = 100
    wind_direction: Optional[str] = "East"
    building_floor: int = 3

class PredictionResponse(BaseModel):
    id: int
    incident_id: int
    spread_risk_score: int
    estimated_spread_minutes: int
    predicted_spread_direction: str
    flashover_probability_pct: int
    structural_collapse_risk: str
    recommended_entry_point: str
    confidence_score: float
    model_version: str
    created_at: datetime

    class Config:
        from_attributes = True

# ----------------- Alerts -----------------
class AlertCreate(BaseModel):
    incident_id: Optional[int] = None
    title: str
    description: str
    details: Optional[str] = None
    severity: str = "Critical"
    detected_source: Optional[str] = "CCTV AI Camera 1"
    confidence_pct: Optional[float] = 94.0

class AlertResponse(AlertCreate):
    id: int
    status: str
    created_at: datetime
    acknowledged_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class AlertAcknowledge(BaseModel):
    status: str = "Acknowledged"

# ----------------- Recommendations -----------------
class RecommendationCreate(BaseModel):
    incident_id: int
    action_type: str
    title: str
    recommendation_text: str
    priority_order: int = 1

class RecommendationVerify(BaseModel):
    approved_actions: List[str]
    commander_directives_note: Optional[str] = None

class RecommendationResponse(RecommendationCreate):
    id: int
    is_verified: bool
    execution_status: str
    commander_directives_note: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

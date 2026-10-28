# ==========================================================
# File: routes/resources.py
# Purpose: Resource management (Firefighter squads, apparatus vehicles, gear)
# ==========================================================

from typing import List, Optional, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import Resource
from schemas import ResourceCreate, ResourceUpdate, ResourceResponse

router = APIRouter(prefix="/resources", tags=["Tactical Resources"])

@router.get("/", response_model=List[ResourceResponse])
def get_resources(
    resource_type: Optional[str] = None,
    status_filter: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Retrieve all operational resources with optional category filter."""
    query = db.query(Resource)
    if resource_type:
        query = query.filter(Resource.resource_type == resource_type)
    if status_filter:
        query = query.filter(Resource.status == status_filter)

    resources = query.all()

    # If empty, seed initial tactical assets
    if not resources:
        initial_assets = [
            Resource(name="Commander Rajesh Varma", resource_type="personnel", unit_category="Incident Control", status="Deployed", current_location="Command Post Alpha", contact_number="+91 98112-44101"),
            Resource(name="Squad Leader Amit Roy", resource_type="personnel", unit_category="Entry Team Alpha", status="Deployed", current_location="Floor 2 Staging (West)", contact_number="+91 98112-44102"),
            Resource(name="Vikas Sharma", resource_type="personnel", unit_category="Search & Rescue 1", status="Deployed", current_location="Floor 4 East Wing", contact_number="+91 98112-44103"),
            Resource(name="Rescue Engine 01 (Water Tender)", resource_type="vehicle", unit_category="Engine Tender", status="Deployed", current_location="Hydrant Gate 2", capacity_or_specs={"water_level": "88%", "pressure": "12 Bar"}),
            Resource(name="Ladder Truck 03 (32m Hydraulic)", resource_type="vehicle", unit_category="Ladder Truck", status="Deployed", current_location="Academic Courtyard", capacity_or_specs={"reach": "32 meters"}),
            Resource(name="High-Expansion Foam Unit 02", resource_type="vehicle", unit_category="Specialized Unit", status="Available", current_location="Main Entrance"),
            Resource(name="Thermal Drone Recon Unit", resource_type="equipment", unit_category="Thermal Drone", status="Deployed", current_location="Hovering (45m)", capacity_or_specs={"battery": "92%", "model": "SkyScout Pro 4K"})
        ]
        db.add_all(initial_assets)
        db.commit()
        resources = initial_assets

    return resources

@router.post("/", response_model=ResourceResponse, status_code=status.HTTP_201_CREATED)
def create_resource(request: ResourceCreate, db: Session = Depends(get_db)):
    """Register new firefighter, apparatus vehicle, or tactical equipment."""
    resource = Resource(
        name=request.name,
        resource_type=request.resource_type,
        unit_category=request.unit_category,
        status=request.status,
        current_location=request.current_location,
        assigned_incident_id=request.assigned_incident_id,
        capacity_or_specs=request.capacity_or_specs,
        contact_number=request.contact_number
    )
    db.add(resource)
    db.commit()
    db.refresh(resource)
    return resource

@router.patch("/{resource_id}", response_model=ResourceResponse)
def update_resource(
    resource_id: int,
    request: ResourceUpdate,
    db: Session = Depends(get_db)
):
    """Update resource deployment status and location."""
    resource = db.query(Resource).filter(Resource.id == resource_id).first()
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")

    if request.status is not None:
        resource.status = request.status
    if request.current_location is not None:
        resource.current_location = request.current_location
    if request.assigned_incident_id is not None:
        resource.assigned_incident_id = request.assigned_incident_id

    db.commit()
    db.refresh(resource)
    return resource

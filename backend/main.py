# ==========================================================
# File: main.py
# Purpose: FastAPI Application Entry Point & API Gateway
# ==========================================================

import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from database import init_db

# Route imports
from routes.auth import router as auth_router
from routes.incidents import router as incidents_router
from routes.sensors import router as sensors_router
from routes.resources import router as resources_router
from routes.predictions import router as predictions_router
from routes.alerts import router as alerts_router
from routes.recommendations import router as recommendations_router

logger = logging.getLogger("firerescue.main")
logging.basicConfig(level=logging.INFO)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize Database Tables
    logger.info("Initializing FireRescue AI Database Schema...")
    init_db()
    logger.info("FireRescue AI Tactical Decision Support API is Ready.")
    yield
    # Shutdown
    logger.info("Shutting down FireRescue AI API services.")

app = FastAPI(
    title="FireRescue AI — Decision Support API",
    description="FastAPI Backend for AI-powered Fire Rescue, Hazard Detection & Evacuation Intelligence",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Middleware Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

import os
from fastapi.staticfiles import StaticFiles

# Register API Route Handlers under /api
app.include_router(auth_router, prefix="/api")
app.include_router(incidents_router, prefix="/api")
app.include_router(sensors_router, prefix="/api")
app.include_router(resources_router, prefix="/api")
app.include_router(predictions_router, prefix="/api")
app.include_router(alerts_router, prefix="/api")
app.include_router(recommendations_router, prefix="/api")

# Mount Static Media Uploads Folder
uploads_dir = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(uploads_dir, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=uploads_dir), name="uploads")

@app.get("/", tags=["Root"])
def root():
    return {
        "system": "FireRescue AI — Decision Support System",
        "status": "Operational",
        "version": settings.APP_VERSION,
        "docs_url": "/docs",
        "database": settings.DATABASE_NAME
    }

@app.get("/health", tags=["Root"])
def health_check():
    return {
        "status": "healthy",
        "service": "firerescue-backend",
        "environment": settings.ENVIRONMENT
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=settings.HOST, port=settings.PORT, reload=True)

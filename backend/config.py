# ==========================================================
# File: config.py
# Purpose: Application settings and environment variables loader
# ==========================================================

import os
from typing import List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "FireRescue AI Backend"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # PostgreSQL Database
    DATABASE_HOST: str = "localhost"
    DATABASE_PORT: int = 5432
    DATABASE_NAME: str = "firerescue_AI"
    DATABASE_USER: str = "postgres"
    DATABASE_PASSWORD: str = "postgres"
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/firerescue_AI"

    # Security
    SECRET_KEY: str = "firerescue_ai_tactical_secret_key_2026_super_secure"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440

    # CORS
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173"

    # AI Prediction Engine
    AI_PREDICTION_ENGINE: str = "enabled"
    CONFIDENCE_THRESHOLD: int = 85

    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "allow"

settings = Settings()

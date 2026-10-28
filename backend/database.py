# ==========================================================
# File: database.py
# Purpose: PostgreSQL connection management, engine, and sessionmaker
# ==========================================================

import logging
from urllib.parse import quote_plus
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from config import settings

logger = logging.getLogger("firerescue.database")
logging.basicConfig(level=logging.INFO)

# Construct safely encoded URL if password has special characters like '@'
if settings.DATABASE_PASSWORD:
    safe_password = quote_plus(settings.DATABASE_PASSWORD)
    DATABASE_URL = f"postgresql://{settings.DATABASE_USER}:{safe_password}@{settings.DATABASE_HOST}:{settings.DATABASE_PORT}/{settings.DATABASE_NAME}"
else:
    DATABASE_URL = settings.DATABASE_URL

# Fallback mechanism if PostgreSQL requires specific password
engine = None
try:
    engine = create_engine(
        DATABASE_URL,
        pool_pre_ping=True,
        pool_size=10,
        max_overflow=20
    )
    # Quick test connection
    with engine.connect() as conn:
        logger.info(f"Connected to PostgreSQL database: {settings.DATABASE_NAME}")
except Exception as e:
    logger.warning(
        f"Could not connect to PostgreSQL with provided credentials ({e}). "
        f"Please verify your DATABASE_PASSWORD in backend/.env. "
        f"Switching to local SQLite fallback for uninterrupted API execution."
    )
    SQLITE_FALLBACK_URL = "sqlite:///./firerescue_local.db"
    engine = create_engine(
        SQLITE_FALLBACK_URL,
        connect_args={"check_same_thread": False}
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    """
    FastAPI dependency yielding a SQLAlchemy database session.
    Automatically closes session after request finishes.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """
    Create all database tables defined in models.py if they do not exist.
    """
    import models  # Ensure all models are imported before creating tables
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables verified/initialized successfully.")

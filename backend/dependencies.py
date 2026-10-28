# ==========================================================
# File: dependencies.py
# Purpose: Shared FastAPI dependencies (DB session, Auth context)
# ==========================================================

from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from database import get_db
from models import User
from utils.security import decode_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login", auto_error=False)

def get_current_user(
    token: Optional[str] = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> Optional[User]:
    """
    Extracts the authenticated user from the JWT token.
    If no token is supplied, returns the active Incident Commander user for dev testing.
    """
    if token:
        payload = decode_access_token(token)
        if payload and "sub" in payload:
            badge_number = payload["sub"]
            user = db.query(User).filter(User.badge_number == badge_number).first()
            if user:
                return user

    # Default fallback to first active user in database (e.g. Incident Commander)
    user = db.query(User).filter(User.is_active == True).first()
    return user

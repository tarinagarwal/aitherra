from fastapi import APIRouter, HTTPException, Depends, Header
from prisma import Prisma
from app.utils.jwt import verify_token
from app.utils.username import generate_unique_username
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/user", tags=["user"])

class UpdateUsernameRequest(BaseModel):
    username: str

async def get_current_user(authorization: Optional[str] = Header(None)):
    """
    Dependency to get current user from JWT token
    """
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    token = authorization.replace("Bearer ", "")
    payload = verify_token(token)
    
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token payload")
    
    db = Prisma()
    await db.connect()
    
    try:
        user = await db.user.find_unique(where={"id": user_id})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    finally:
        await db.disconnect()

@router.get("/me")
async def get_current_user_info(user = Depends(get_current_user)):
    """
    Get current user information
    """
    return {
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "username": user.username,
        "profileImage": user.profileImage,
        "isOnboarded": user.isOnboarded,
    }

@router.put("/username")
async def update_username(
    request: UpdateUsernameRequest,
    user = Depends(get_current_user)
):
    """
    Update user's username
    """
    new_username = request.username.strip().lower()
    
    # Validate username
    if len(new_username) < 3:
        raise HTTPException(status_code=400, detail="Username must be at least 3 characters")
    
    if len(new_username) > 30:
        raise HTTPException(status_code=400, detail="Username must be less than 30 characters")
    
    # Check if username contains only valid characters
    if not all(c.isalnum() or c == '_' for c in new_username):
        raise HTTPException(status_code=400, detail="Username can only contain letters, numbers, and underscores")
    
    db = Prisma()
    await db.connect()
    
    try:
        # Check if username is already taken
        existing_user = await db.user.find_unique(where={"username": new_username})
        if existing_user and existing_user.id != user.id:
            raise HTTPException(status_code=400, detail="Username already taken")
        
        # Update username
        updated_user = await db.user.update(
            where={"id": user.id},
            data={"username": new_username}
        )
        
        return {
            "id": updated_user.id,
            "email": updated_user.email,
            "name": updated_user.name,
            "username": updated_user.username,
            "profileImage": updated_user.profileImage,
            "isOnboarded": updated_user.isOnboarded,
        }
    
    finally:
        await db.disconnect()

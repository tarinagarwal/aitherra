from fastapi import APIRouter, HTTPException
from prisma import Prisma
from pydantic import BaseModel
from typing import Optional, List

router = APIRouter(prefix="/profile", tags=["profile"])

class PublicProfileResponse(BaseModel):
    id: str
    name: str
    username: str
    profileImage: Optional[str]
    isOnboarded: bool
    experienceLevel: Optional[str]
    timeCommitment: Optional[int]
    primaryLanguage: Optional[str]
    learningGoals: List[str]
    learningStyle: Optional[str]
    createdAt: str

@router.get("/{username}", response_model=PublicProfileResponse)
async def get_public_profile(username: str):
    """
    Get public profile by username (accessible to everyone)
    """
    db = Prisma()
    await db.connect()
    
    try:
        user = await db.user.find_unique(where={"username": username})
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        return PublicProfileResponse(
            id=user.id,
            name=user.name,
            username=user.username,
            profileImage=user.profileImage,
            isOnboarded=user.isOnboarded,
            experienceLevel=user.experienceLevel,
            timeCommitment=user.timeCommitment,
            primaryLanguage=user.primaryLanguage,
            learningGoals=user.learningGoals or [],
            learningStyle=user.learningStyle,
            createdAt=user.createdAt.isoformat(),
        )
    
    finally:
        await db.disconnect()

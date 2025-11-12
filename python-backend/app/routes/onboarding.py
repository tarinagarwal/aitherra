from fastapi import APIRouter, HTTPException, Depends
from prisma import Prisma
from pydantic import BaseModel
from typing import List, Optional
from app.routes.user import get_current_user

router = APIRouter(prefix="/onboarding", tags=["onboarding"])

class OnboardingData(BaseModel):
    experienceLevel: str
    timeCommitment: int
    primaryLanguage: str
    learningGoals: List[str]
    learningStyle: str

class OnboardingStatusResponse(BaseModel):
    isOnboarded: bool
    data: Optional[dict] = None

@router.get("/status", response_model=OnboardingStatusResponse)
async def get_onboarding_status(user = Depends(get_current_user)):
    """
    Check if user has completed onboarding
    """
    if user.isOnboarded:
        return OnboardingStatusResponse(
            isOnboarded=True,
            data={
                "experienceLevel": user.experienceLevel,
                "timeCommitment": user.timeCommitment,
                "primaryLanguage": user.primaryLanguage,
                "learningGoals": user.learningGoals,
                "learningStyle": user.learningStyle,
            }
        )
    return OnboardingStatusResponse(isOnboarded=False)

@router.post("/complete")
async def complete_onboarding(
    data: OnboardingData,
    user = Depends(get_current_user)
):
    """
    Complete user onboarding
    """
    # Validate experience level
    valid_levels = ["beginner", "intermediate", "advanced"]
    if data.experienceLevel not in valid_levels:
        raise HTTPException(status_code=400, detail="Invalid experience level")
    
    # Validate time commitment
    if data.timeCommitment < 1 or data.timeCommitment > 168:
        raise HTTPException(status_code=400, detail="Time commitment must be between 1 and 168 hours")
    
    # Validate learning style
    valid_styles = ["visual", "hands-on", "reading", "mixed"]
    if data.learningStyle not in valid_styles:
        raise HTTPException(status_code=400, detail="Invalid learning style")
    
    # Validate learning goals
    if len(data.learningGoals) == 0:
        raise HTTPException(status_code=400, detail="At least one learning goal is required")
    
    db = Prisma()
    await db.connect()
    
    try:
        updated_user = await db.user.update(
            where={"id": user.id},
            data={
                "isOnboarded": True,
                "experienceLevel": data.experienceLevel,
                "timeCommitment": data.timeCommitment,
                "primaryLanguage": data.primaryLanguage,
                "learningGoals": data.learningGoals,
                "learningStyle": data.learningStyle,
            }
        )
        
        return {
            "success": True,
            "message": "Onboarding completed successfully",
            "user": {
                "id": updated_user.id,
                "email": updated_user.email,
                "name": updated_user.name,
                "username": updated_user.username,
                "profileImage": updated_user.profileImage,
                "isOnboarded": updated_user.isOnboarded,
            }
        }
    
    finally:
        await db.disconnect()

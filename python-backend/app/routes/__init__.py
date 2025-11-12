from fastapi import APIRouter
from .auth import router as auth_router
from .user import router as user_router
from .onboarding import router as onboarding_router
from .profile import router as profile_router

router = APIRouter()

# Include sub-routers
router.include_router(auth_router)
router.include_router(user_router)
router.include_router(onboarding_router)
router.include_router(profile_router)

@router.get("/health")
async def health_check():
    return {"status": "healthy"}

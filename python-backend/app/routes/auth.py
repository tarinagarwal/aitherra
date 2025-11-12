from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from authlib.integrations.starlette_client import OAuth
from starlette.config import Config
from prisma import Prisma
from app.config import settings
from app.utils.jwt import create_access_token
from app.utils.username import generate_unique_username
from pydantic import BaseModel
import httpx

router = APIRouter(prefix="/auth", tags=["auth"])

# OAuth configuration
config = Config(environ={
    "GOOGLE_CLIENT_ID": settings.GOOGLE_CLIENT_ID,
    "GOOGLE_CLIENT_SECRET": settings.GOOGLE_CLIENT_SECRET,
})

oauth = OAuth(config)
oauth.register(
    name='google',
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'}
)

class GoogleAuthRequest(BaseModel):
    code: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict

@router.post("/google", response_model=TokenResponse)
async def google_auth(auth_request: GoogleAuthRequest):
    """
    Exchange Google OAuth code for user token
    """
    try:
        # Exchange code for token
        async with httpx.AsyncClient() as client:
            token_response = await client.post(
                "https://oauth2.googleapis.com/token",
                data={
                    "code": auth_request.code,
                    "client_id": settings.GOOGLE_CLIENT_ID,
                    "client_secret": settings.GOOGLE_CLIENT_SECRET,
                    "redirect_uri": settings.GOOGLE_REDIRECT_URI,
                    "grant_type": "authorization_code",
                }
            )
            
            if token_response.status_code != 200:
                raise HTTPException(status_code=400, detail="Failed to exchange code for token")
            
            token_data = token_response.json()
            access_token = token_data.get("access_token")
            
            # Get user info from Google
            user_response = await client.get(
                "https://www.googleapis.com/oauth2/v2/userinfo",
                headers={"Authorization": f"Bearer {access_token}"}
            )
            
            if user_response.status_code != 200:
                raise HTTPException(status_code=400, detail="Failed to get user info")
            
            user_info = user_response.json()
        
        # Connect to database
        db = Prisma()
        await db.connect()
        
        try:
            # Check if user exists
            user = await db.user.find_unique(where={"email": user_info["email"]})
            
            if not user:
                # Generate unique username
                username = await generate_unique_username(user_info["email"], db)
                
                # Create new user
                user = await db.user.create(
                    data={
                        "email": user_info["email"],
                        "name": user_info["name"],
                        "username": username,
                        "profileImage": user_info.get("picture"),
                        "googleId": user_info["id"],
                    }
                )
            else:
                # Update profile image if changed
                if user.profileImage != user_info.get("picture"):
                    user = await db.user.update(
                        where={"id": user.id},
                        data={"profileImage": user_info.get("picture")}
                    )
            
            # Create JWT token
            jwt_token = create_access_token(
                data={"sub": user.id, "email": user.email}
            )
            
            return TokenResponse(
                access_token=jwt_token,
                user={
                    "id": user.id,
                    "email": user.email,
                    "name": user.name,
                    "username": user.username,
                    "profileImage": user.profileImage,
                }
            )
        
        finally:
            await db.disconnect()
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/google/url")
async def get_google_auth_url():
    """
    Get Google OAuth URL for frontend redirect
    """
    auth_url = (
        f"https://accounts.google.com/o/oauth2/v2/auth?"
        f"client_id={settings.GOOGLE_CLIENT_ID}&"
        f"redirect_uri={settings.GOOGLE_REDIRECT_URI}&"
        f"response_type=code&"
        f"scope=openid%20email%20profile&"
        f"access_type=offline"
    )
    return {"url": auth_url}

import uvicorn
from app import app
from app.config import settings
from app.routes import router

app.include_router(router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run(
        "run:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=True
    )

import uvicorn
from app import app
from app.config import settings
from app.routes import router
from code_editor.main import app as code_editor_app

app.include_router(router, prefix="/api")

app.mount("/code-editor", code_editor_app)

if __name__ == "__main__":
    uvicorn.run(
        "run:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=True
    )
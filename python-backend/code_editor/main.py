from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from code_editor.routes.api import router
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Code Execution API",
    description="API for executing and testing user code",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(router)


@app.get("/")
async def base_response():
    logger.info("Base endpoint called")
    return {
        "message": "Connected Successfully!!",
        "version": "1.0.0"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    logger.info("Health check called")
    return {"status": "healthy"}
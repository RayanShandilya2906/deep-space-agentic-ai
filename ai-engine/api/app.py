from fastapi import FastAPI
from services.image_analysis_service import (
    ImageAnalysisService
)


app = FastAPI(
    title="Deep Space Agentic AI"
)

service = ImageAnalysisService()


@app.get("/")
def home():

    return {
        "message": "Deep Space Agentic AI Running"
    }


@app.get("/analyze")
def analyze(image_path: str):

    result = service.analyze(
        image_path
    )

    return result
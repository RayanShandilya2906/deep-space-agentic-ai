from fastapi import FastAPI
from fastapi import UploadFile
from fastapi import File

import os
import shutil

from services.image_analysis_service import (
    ImageAnalysisService
)

app = FastAPI(
    title="Deep Space Agentic AI"
)

service = ImageAnalysisService()

UPLOAD_DIR = "temp_uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)


@app.get("/")
def home():

    return {
        "message": "Deep Space Agentic AI Running"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }


@app.post("/analyze")
async def analyze(
    image: UploadFile = File(...)
):

    temp_path = os.path.join(
        UPLOAD_DIR,
        image.filename
    )

    try:

        with open(
            temp_path,
            "wb"
        ) as buffer:

            shutil.copyfileobj(
                image.file,
                buffer
            )

        result = service.analyze(
            temp_path
        )

        return {
            "success": True,
            "data": result
        }

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }

    finally:

        if os.path.exists(
            temp_path
        ):
            os.remove(
                temp_path
            )
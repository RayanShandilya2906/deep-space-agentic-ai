from services.image_analysis_service import (
    ImageAnalysisService
)


service = ImageAnalysisService()

result = service.analyze(
    "datasets/planets/jupiter1.jpg"
)

print(result["analysis"])

print("\n")
print("=" * 50)
print("\n")

print(result["report"])
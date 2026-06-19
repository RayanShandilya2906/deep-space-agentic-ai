from agents.analyzer_agent import AnalyzerAgent

agent = AnalyzerAgent()

images = [
    "datasets/nebulae/crab.jpg",
    "datasets/planets/saturn1.jpg",
    "datasets/moons/titan1.jfif",
    "datasets/comets/neowise1.jfif"
]

for image_path in images:

    print("\n========================================")
    print("IMAGE:", image_path)
    print("========================================")

    result = agent.analyze(image_path)

    print("Primary Category:",
          result["primary_category"])

    print("Detected Objects:",
          result["detected_objects"])

    print("Object Name:",
          result["object_name"])

    print("Confidence:",
          result["confidence"])
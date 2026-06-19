from agents.analyzer_agent import AnalyzerAgent

agent = AnalyzerAgent()

images = [
    "datasets/black_holes/M87_1.jpg"
]

for image_path in images:

    print("\n================================")
    print("IMAGE:", image_path)
    print("================================")

    result = agent.analyze(image_path)

    print("Primary Category:",
          result["primary_category"])

    print("Object Name:",
          result["object_name"])

    print("Confidence:",
          result["confidence"])
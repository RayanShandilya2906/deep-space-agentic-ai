from agents.detector_agent import DetectorAgent
from agents.classifier_agent import ClassifierAgent
from agents.information_agent import InformationAgent
from agents.recommendation_agent import RecommendationAgent
from agents.report_agent import ReportAgent


detector = DetectorAgent()
classifier = ClassifierAgent()
information = InformationAgent()
recommendation = RecommendationAgent()
report = ReportAgent()


# Test image
image_path = "datasets/planets/jupiter1.jpg"


# Detect all objects
objects = detector.detect(image_path)

print("Detected Objects:", objects)


# Main category
category = classifier.classify(image_path)

print("Primary Category:", category)


# Detailed object info
info = information.get_info(image_path)


# Similar recommendations
recs = recommendation.recommend(image_path)


# Final report
result = report.generate(info, recs)

print(result)
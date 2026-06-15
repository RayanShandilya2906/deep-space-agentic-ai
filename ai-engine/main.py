from agents.classifier_agent import ClassifierAgent
from agents.information_agent import InformationAgent
from agents.recommendation_agent import RecommendationAgent
from agents.report_agent import ReportAgent

classifier = ClassifierAgent()
information = InformationAgent()
recommendation = RecommendationAgent()
report = ReportAgent()

# Image path
category = classifier.classify("datasets/galaxies/andromeda.jpg")

# Get information
info = information.get_info(category)

# Get recommendations
recs = recommendation.recommend(category)

# Generate final report
result = report.generate(info, recs)

print(result)
from agents.analyzer_agent import AnalyzerAgent
from agents.report_agent import ReportAgent


analyzer = AnalyzerAgent()
report_agent = ReportAgent()


image_path = input(
    "Enter image path: "
)

result = analyzer.analyze(
    image_path
)

report = report_agent.generate(
    result
)

print(report)
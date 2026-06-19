from agents.analyzer_agent import AnalyzerAgent
from agents.report_agent import ReportAgent


class ImageAnalysisService:

    def __init__(self):

        self.analyzer = AnalyzerAgent()
        self.report_agent = ReportAgent()

    def analyze(self, image_path):

        result = self.analyzer.analyze(
            image_path
        )

        report = self.report_agent.generate(
            result
        )

        result["report"] = report

        return result
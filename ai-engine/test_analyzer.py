from agents.analyzer_agent import AnalyzerAgent

agent = AnalyzerAgent()

result = agent.analyze(
    "datasets/black_holes/M87_1.jpg"
)

print(result)
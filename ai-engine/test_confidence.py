from agents.confidence_agent import ConfidenceAgent

sample = {
    "confidence": 96
}

agent = ConfidenceAgent()

result = agent.get_confidence(sample)

print(result)
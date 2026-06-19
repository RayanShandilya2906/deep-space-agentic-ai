from agents.recommendation_agent import RecommendationAgent

sample = {
    "recommendations": [
        "Sagittarius A*",
        "Cygnus X-1",
        "TON 618"
    ]
}

agent = RecommendationAgent()

result = agent.recommend(sample)

print(result)
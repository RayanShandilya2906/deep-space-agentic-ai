from agents.multi_object_agent import MultiObjectAgent

sample = {
    "objects": [
        {
            "name": "M87*",
            "category": "Black Hole",
            "confidence": 96
        },
        {
            "name": "M87 Galaxy",
            "category": "Galaxy",
            "confidence": 93
        }
    ]
}

agent = MultiObjectAgent()

result = agent.get_objects(sample)

print(result)
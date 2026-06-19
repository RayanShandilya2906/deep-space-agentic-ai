from agents.multi_object_agent import MultiObjectAgent

sample = {
    "objects": [
        {
            "name": "M87*",
            "category": "Black Hole",
            "confidence": 96,
            "description": "Supermassive black hole located at the center of galaxy M87."
        },
        {
            "name": "M87 Galaxy",
            "category": "Galaxy",
            "confidence": 93,
            "description": "A giant elliptical galaxy in the Virgo Cluster."
        }
    ]
}

agent = MultiObjectAgent()

objects = agent.get_objects(sample)

for obj in objects:

    print("\n------------------")
    print("Name:", obj["name"])
    print("Category:", obj["category"])
    print("Confidence:", f"{obj['confidence']}%")
    print("Description:", obj["description"])
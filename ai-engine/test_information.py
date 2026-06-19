from agents.information_agent import InformationAgent

sample = {
    "object_name": "M87*",
    "type": "Supermassive Black Hole",
    "distance": "55 million light years",
    "facts": [
        "First black hole ever imaged"
    ],
    "summary": "Located in galaxy M87"
}

info_agent = InformationAgent()

info = info_agent.get_info(sample)

print(info)
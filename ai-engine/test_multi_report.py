from agents.report_agent import ReportAgent

info = {
    "object_name": "M87*",
    "type": "Supermassive Black Hole",
    "distance": "55 million light years",
    "facts": [
        "First black hole ever imaged",
        "Located in galaxy M87"
    ],
    "summary": "One of the most famous black holes."
}

recommendations = [
    "Sagittarius A*",
    "Cygnus X-1",
    "TON 618"
]

confidence = 96

detected_objects = [
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

report = ReportAgent()

result = report.generate(
    info,
    recommendations,
    confidence,
    detected_objects
)

print(result)
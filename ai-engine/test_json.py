import json

sample = """
{
    "detected_objects": ["Black Hole"],
    "primary_category": "Black Hole",
    "object_name": "M87*",
    "type": "Supermassive Black Hole",
    "distance": "55 million light years",
    "facts": [
        "First black hole ever imaged"
    ],
    "summary": "Located in galaxy M87",
    "recommendations": [
        "Sagittarius A*",
        "Cygnus X-1",
        "TON 618"
    ]
}
"""

data = json.loads(sample)

print(data["primary_category"])
print(data["recommendations"])
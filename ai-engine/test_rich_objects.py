sample = {
    "objects": [
        {
            "name": "Andromeda Galaxy",
            "category": "Galaxy",
            "confidence": 98,
            "description": "Nearest major galaxy to the Milky Way.",
            "distance": "2.5 million light years",
            "facts": [
                "Contains roughly one trillion stars",
                "Largest galaxy in the Local Group",
                "Will merge with the Milky Way in about 4.5 billion years"
            ]
        }
    ]
}

for obj in sample["objects"]:

    print("\nName:", obj["name"])
    print("Category:", obj["category"])
    print("Confidence:", f"{obj['confidence']}%")
    print("Description:", obj["description"])
    print("Distance:", obj["distance"])

    print("Facts:")

    for fact in obj["facts"]:
        print("-", fact)
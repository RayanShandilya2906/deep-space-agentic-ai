from agents.classifier_agent import ClassifierAgent

sample = {
    "primary_category": "Black Hole"
}

classifier = ClassifierAgent()

result = classifier.classify(sample)

print(result)
from agents.detector_agent import DetectorAgent

sample = {
    "detected_objects": [
        "Black Hole",
        "Galaxy"
    ]
}

detector = DetectorAgent()

objects = detector.detect(sample)

print(objects)
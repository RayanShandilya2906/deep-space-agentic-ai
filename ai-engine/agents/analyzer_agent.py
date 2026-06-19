from google import genai
from config import GEMINI_API_KEY
from PIL import Image
import json
import time


class AnalyzerAgent:

    def analyze(self, image_path):

        client = genai.Client(api_key=GEMINI_API_KEY)

        image = Image.open(image_path)

        retries = 3

        for attempt in range(retries):

            try:

                response = client.models.generate_content(
                    model="gemini-2.5-flash",
                    contents=[
                        image,
                        """
                        Analyze this astronomy image.

                        Return ONLY valid JSON.

                        Format:

                        {
                            "detected_objects": [],
                            "primary_category": "",
                            "confidence": 0,

                            "objects": [
                                {
                                    "name": "",
                                    "category": "",
                                    "confidence": 0,
                                    "description": "",
                                    "distance": "",
                                    "facts": []
                                }
                            ],

                            "object_name": "",
                            "type": "",
                            "distance": "",
                            "facts": [],
                            "summary": "",
                            "recommendations": []
                        }

                        Allowed categories:

                        Galaxy
                        Nebula
                        Planet
                        Moon
                        Asteroid
                        Comet
                        Star Cluster
                        Supernova Remnant
                        Black Hole

                        IMPORTANT RULES:

                        1. confidence MUST be an integer between 0 and 100.

                        2. detected_objects MUST contain ONLY:
                           Galaxy
                           Nebula
                           Planet
                           Moon
                           Asteroid
                           Comet
                           Star Cluster
                           Supernova Remnant
                           Black Hole

                        3. Do NOT return categories outside this list.

                        4. object_name must be identical to the
                           highest confidence object's name.

                        5. If distance is known,
                           return approximate distance from Earth.

                        6. facts must contain EXACTLY 3 facts.

                        7. recommendations must contain EXACTLY
                           3 similar celestial objects.

                        8. recommendations must contain ONLY
                           celestial object names.

                        9. description should be a short
                           scientific description.

                        10. The "objects" field should contain
                            every detected celestial object.

                        11. Return valid JSON only.

                        No markdown.
                        No explanations.
                        No extra text.
                        """
                    ]
                )

                text = response.text.strip()

                if text.startswith("```json"):
                    text = text.replace("```json", "")
                    text = text.replace("```", "")
                    text = text.strip()

                # Extract JSON safely
                start = text.find("{")
                end = text.rfind("}") + 1

                text = text[start:end]

                data = json.loads(text)

                # Normalize main confidence
                if data.get("confidence") is not None:

                    confidence = data["confidence"]

                    if isinstance(confidence, float):

                        data["confidence"] = int(
                            confidence * 100
                        )

                # Normalize object confidences
                for obj in data.get("objects", []):

                    obj_conf = obj.get("confidence")

                    if isinstance(obj_conf, float):

                        obj["confidence"] = int(
                            obj_conf * 100
                        )

                return data

            except Exception as e:

                print(
                    f"Attempt {attempt + 1} failed:"
                )

                print(e)

                if attempt < retries - 1:

                    print("Retrying in 5 seconds...")

                    time.sleep(5)

                else:

                    raise
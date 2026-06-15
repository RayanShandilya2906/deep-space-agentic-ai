from google import genai
from config import GEMINI_API_KEY
from PIL import Image


class DetectorAgent:

    def detect(self, image_path):

        client = genai.Client(api_key=GEMINI_API_KEY)

        image = Image.open(image_path)

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                image,
                """
                Detect ALL celestial objects visible in this image.

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

                Return ONLY a comma-separated list.

                Example:
                Galaxy, Black Hole

                If only one object exists:
                Galaxy

                Do not explain anything.
                """
            ]
        )

        objects = [obj.strip() for obj in response.text.split(",")]

        return objects
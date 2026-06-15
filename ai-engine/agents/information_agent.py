from google import genai
from config import GEMINI_API_KEY
from PIL import Image


class InformationAgent:

    def get_info(self, image_path):

        client = genai.Client(api_key=GEMINI_API_KEY)

        image = Image.open(image_path)

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                image,
                """
                Identify the main celestial object in this image.

                Then provide:

                Name:
                Type:
                Distance:
                Key Facts:
                Short Summary:

                Be scientifically accurate.
                """
            ]
        )

        return response.text
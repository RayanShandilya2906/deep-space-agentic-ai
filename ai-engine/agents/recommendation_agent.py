from google import genai
from config import GEMINI_API_KEY
from PIL import Image


class RecommendationAgent:

    def recommend(self, image_path):

        client = genai.Client(api_key=GEMINI_API_KEY)

        image = Image.open(image_path)

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                image,
                """
                Identify the celestial object shown.

                Recommend 3 similar astronomy objects.

                Return ONLY a bullet list.

                Example:

                - Saturn
                - Neptune
                - Uranus
                """
            ]
        )

        recommendations = []

        for line in response.text.splitlines():

            line = line.strip()

            if line.startswith("*"):
                recommendations.append(
                    line.replace("*", "").strip()
                )

            elif line.startswith("-"):
                recommendations.append(
                    line.replace("-", "").strip()
                )

        return recommendations
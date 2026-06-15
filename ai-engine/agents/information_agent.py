from google import genai
from config import GEMINI_API_KEY


class InformationAgent:

    def get_info(self, category):

        client = genai.Client(api_key=GEMINI_API_KEY)

        prompt = """
Give information about Andromeda Galaxy.

Return:

Name:
Type:
Distance:
Key Facts:
Short Summary:
"""

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return response.text
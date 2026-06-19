class InformationAgent:

    def get_info(self, analysis_data):

        return {
            "object_name": analysis_data["object_name"],
            "type": analysis_data["type"],
            "distance": analysis_data["distance"],
            "facts": analysis_data["facts"],
            "summary": analysis_data["summary"]
        }
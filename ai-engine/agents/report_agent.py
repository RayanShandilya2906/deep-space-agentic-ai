class ReportAgent:

    def generate(self, result):

        report = """
====================================
      DEEP SPACE AI REPORT
====================================
"""

        if result.get("objects"):

            report += "\nDetected Objects:\n"

            for index, obj in enumerate(
                result["objects"],
                start=1
            ):

                report += f"""

Object {index}
-----------
Name: {obj['name']}
Category: {obj['category']}
Confidence: {obj['confidence']}%
"""

        report += f"""


Primary Object Analysis
-----------------------
Name: {result['object_name']}
Type: {result['type']}
Distance: {result['distance']}
Confidence: {result['confidence']}%

Facts:
"""

        for fact in result["facts"]:
            report += f"\n- {fact}"

        report += f"""

Summary:
{result['summary']}

Recommended Objects:
"""

        for obj in result["recommendations"]:
            report += f"\n- {obj}"

        return report
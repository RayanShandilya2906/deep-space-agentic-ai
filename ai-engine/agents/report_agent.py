class ReportAgent:

    def generate(self, info, recommendations):

        report = f"""
====================================
      DEEP SPACE AI REPORT
====================================

{info}

Recommended Objects:
"""

        for obj in recommendations:
            report += f"\n- {obj}"

        return report
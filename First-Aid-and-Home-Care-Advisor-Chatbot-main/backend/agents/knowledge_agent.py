import os
from google import genai
from typing import List

class KnowledgeAgent:
    """
    Uses Gemini API to suggest possible general conditions and standard first aid.
    """
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        if not self.api_key:
            print("WARNING: GEMINI_API_KEY environment variable not set.")
            self.client = None
        else:
            self.client = genai.Client(api_key=self.api_key)

    def run(self, symptoms: List[str]) -> List[str]:
        if not self.client:
            return ["API Key Missing - Please configure GEMINI_API_KEY"]
            
        if not symptoms:
            return ["Unknown Conditions"]

        symptoms_str = ", ".join(symptoms)
        
        prompt = f"""
        Given the following symptoms: {symptoms_str}
        Provide 2 to 3 possible general conditions that could cause these symptoms.
        Do NOT provide a definitive medical diagnosis.
        Output ONLY a comma-separated list of the conditions, no extra text.
        """
        
        try:
            response = self.client.models.generate_content(
                model='gemini-2.5-flash',
                contents=prompt
            )
            # Parse the comma-separated output
            conditions_text = response.text.strip()
            conditions = [c.strip() for c in conditions_text.split(",") if c.strip()]
            
            # Fallback if Gemini returned something weird
            if not conditions:
                return ["General Illness"]
                
            return conditions[:3] # Ensure at most 3
            
        except Exception as e:
            print(f"Gemini API Error in KnowledgeAgent: {e}")
            return ["Unable to determine conditions at this time."]

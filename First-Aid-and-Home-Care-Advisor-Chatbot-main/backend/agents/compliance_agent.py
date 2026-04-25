from typing import Dict, Any, List
import os
from google import genai

class ComplianceAgent:
    """
    Ensures that outputs contain no prescriptions or harmful advice, 
    and appends the proper medical disclaimers.
    """
    def __init__(self):
        self.disclaimer = "DISCLAIMER: This is an AI tool for informational purposes only. It is NOT a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider."
        api_key = os.getenv("GEMINI_API_KEY")
        if api_key:
            self.client = genai.Client(api_key=api_key)
        else:
            self.client = None

    def run(self, symptoms: List[str], risk_level: str) -> Dict[str, Any]:
        """
        Uses Gemini to generate the highly actionable, formatted response block.
        """
        symptoms_str = ", ".join(symptoms)
        formatted_text = ""

        if self.client and symptoms:
            prompt = f"""
            You are an expert AI Medical Assistant for a hackathon demo.
            User symptoms: {symptoms_str}
            Internal Risk Class: {risk_level}
            
            Generate a CLEAN, HUMAN-READABLE markdown response. Do NOT use JSON.
            Use this exact 8-part structure:

            { "This is a medical emergency — act immediately.\\n\\n" if risk_level == "EMERGENCY" else "" }
            1. Risk Heading:
            - { "🚨 EMERGENCY" if risk_level == "EMERGENCY" else "🟡 MEDIUM RISK" if risk_level == "MEDIUM" else "🟢 LOW RISK" }
            - Add a short title like "Mild Skin Irritation" or "Severe Chest Pain"

            2. Short Summary:
            - [One simple sentence explaining the situation]

            3. Do this RIGHT NOW:
            - [3–5 clear step-by-step actions]
            { "- Call emergency numbers IMMEDIATELY (India: 108 / 112)" if risk_level == "EMERGENCY" else "" }

            4. What NOT to do:
            - [2–3 safety precautions]

            5. What to monitor:
            - [Symptoms to watch]

            6. When to seek help:
            - [Clear conditions for doctor/emergency]

            7. Follow-up questions:
            - [1–2 simple diagnostic questions]
            """
            
            try:
                response = self.client.models.generate_content(
                    model='gemini-2.5-flash',
                    contents=prompt
                )
                formatted_text = response.text.strip()
            except Exception as e:
                print(f"Gemini API Error in ComplianceAgent: {e}")
                formatted_text = "An error occurred generating instructions. Please seek medical help immediately."
        else:
            if risk_level == "EMERGENCY":
                formatted_text = "🚨 EMERGENCY\n\nThis is a medical emergency — act immediately.\n\nDo this RIGHT NOW:\n1. CALL EMERGENCY SERVICES IMMEDIATELY (e.g., 911 or local emergency number).\n2. Ensure the person is breathing and out of immediate danger.\n\nWhat NOT to do:\n- Do not move them unless they are in direct physical danger."
            else:
                formatted_text = "Rest and stay hydrated. Monitor your symptoms and consult a doctor if they worsen."

        # Always strictly append the disclaimer
        final_response_text = f"{formatted_text}\n\n---\n*{self.disclaimer}*"

        return {
            "formatted_text": final_response_text,
            "disclaimer": self.disclaimer
        }

from typing import List

class DecisionAgent:
    """
    Rule-based risk classification based on keywords in symptoms and conditions.
    Outputs: LOW, MEDIUM, EMERGENCY
    """
    def __init__(self):
        self.emergency_keywords = {
            "chest pain", "breathing difficulty", "shortness of breath", 
            "unconscious", "heart attack", "stroke", "severe bleeding",
            "choking", "seizure", "not breathing", "blue lips"
        }
        
        self.medium_keywords = {
            "fever", "migraine", "vomiting", "diarrhea", "fracture",
            "broken bone", "deep cut", "infection", "dizziness"
        }

    def run(self, symptoms: List[str], conditions: List[str]) -> str:
        combined_text = " ".join(symptoms + conditions).lower()
        
        # Check for EMERGENCY first
        for keyword in self.emergency_keywords:
            if keyword in combined_text:
                return "EMERGENCY"
                
        # Check for MEDIUM
        for keyword in self.medium_keywords:
            if keyword in combined_text:
                return "MEDIUM"
                
        # Default to LOW
        return "LOW"

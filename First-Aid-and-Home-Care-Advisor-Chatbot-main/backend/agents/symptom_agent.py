import re
from typing import List

class SymptomAgent:
    """
    Extracts and cleans symptoms from raw user input text.
    For this hackathon, we use simple regex/extraction logic to keep it fast and modular.
    Could be upgraded to use LLM extraction.
    """
    def __init__(self):
        # A basic list of known common symptoms to help with extraction if needed,
        # but primarily we will split the input by commas/and to infer symptoms.
        pass

    def run(self, user_input: str) -> List[str]:
        # Simple extraction: splitting by commas, 'and', 'with'
        # In a real system, an LLM call or SpaCy NER would be here.
        split_pattern = r',|\band\b|\bwith\b'
        raw_symptoms = re.split(split_pattern, user_input.lower())
        
        cleaned_symptoms = []
        for s in raw_symptoms:
            s_clean = s.strip()
            # Remove filler words
            s_clean = re.sub(r'^(i have|i feel|feeling|having a|having|got a|some|severe|mild)\s+', '', s_clean)
            if s_clean and len(s_clean) > 2:
                cleaned_symptoms.append(s_clean)
                
        # Fallback if parsing results in empty
        if not cleaned_symptoms:
            # Maybe user just typed "headache"
            cleaned_symptoms = [user_input.strip().lower()]

        return cleaned_symptoms

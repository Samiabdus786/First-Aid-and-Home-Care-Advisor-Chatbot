from typing import Dict, Any, List

class ActionAgent:
    """
    Action Agent (Final Response)
    Combines all outputs into the final structured JSON response.
    """
    def __init__(self):
        pass

    def run(
        self, 
        symptoms: List[str], 
        conditions: List[str], 
        risk_level: str, 
        compliance_data: Dict[str, Any]
    ) -> str:
        """
        Takes the outputs from all previous agents and returns the
        strictly required human-readable string.
        """
        return compliance_data.get("formatted_text", "")

import time
from typing import Dict, Any, List

class AuditLogger:
    """
    In-memory audit logger for the MediFlow AI pipeline.
    In a real-world scenario, this should be backed by a database.
    """
    def __init__(self):
        self.logs: List[Dict[str, Any]] = []

    def log_interaction(
        self,
        user_input: str,
        symptom_agent_output: List[str],
        knowledge_agent_output: List[str],
        decision_agent_output: str,
        compliance_agent_output: Dict[str, Any],
        action_agent_output: Dict[str, Any]
    ) -> None:
        """
        Logs an entire multi-agent pipeline interaction.
        """
        log_entry = {
            "timestamp": time.time(),
            "user_input": user_input,
            "agents": {
                "symptom_agent": symptom_agent_output,
                "knowledge_agent": knowledge_agent_output,
                "decision_agent": decision_agent_output,
                "compliance_agent": compliance_agent_output,
                "action_agent": action_agent_output
            },
            "final_response": action_agent_output
        }
        self.logs.append(log_entry)

    def get_all_logs(self) -> List[Dict[str, Any]]:
        """
        Retrieves all stored logs.
        """
        return self.logs

# Global logger instance
logger_instance = AuditLogger()

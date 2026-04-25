from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import uvicorn
from dotenv import load_dotenv

# Load environment variables from .env
# (Adding this comment forces uvicorn to live-reload reading the new key)
load_dotenv()

from agents.symptom_agent import SymptomAgent
from agents.knowledge_agent import KnowledgeAgent
from agents.decision_agent import DecisionAgent
from agents.compliance_agent import ComplianceAgent
from agents.action_agent import ActionAgent
from utils.logger import logger_instance

app = FastAPI(
    title="MediFlow AI", 
    description="Autonomous Healthcare Multi-Agent System"
)

# Initialize all agents
symptom_agent = SymptomAgent()
knowledge_agent = KnowledgeAgent()
decision_agent = DecisionAgent()
compliance_agent = ComplianceAgent()
action_agent = ActionAgent()

# Pydantic models for strictly structured JSON request/responses
class AnalyzeRequest(BaseModel):
    symptoms: str

class AnalyzeResponse(BaseModel):
    formatted_response: str

@app.get("/")
async def root():
    """Root endpoint to verify the API is running."""
    return {
        "status": "online",
        "message": "Welcome to MediFlow AI API! Everything is working correctly.",
        "docs": "Visit /docs for the interactive API documentation.",
        "endpoints": ["POST /analyze", "GET /logs"]
    }

@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze_symptoms(request: AnalyzeRequest):
    """
    Multi-agent pipeline endpoint to analyze user symptoms and output 
    structured guidance.
    """
    try:
        user_input = request.symptoms
        
        # 1. Symptom Analyzer Agent (Extracts and cleans symptoms)
        extracted_symptoms = symptom_agent.run(user_input)
        
        # 2. Knowledge Agent (Uses Gemini AI to suggest conditions)
        conditions = knowledge_agent.run(extracted_symptoms)
        
        # 3. Decision Agent (Rule-based risk classification)
        risk_level = decision_agent.run(extracted_symptoms, conditions)
        
        # 4. Compliance Agent (Ensures safety, provides first-aid without medical diagnosis)
        compliance_data = compliance_agent.run(extracted_symptoms, risk_level)
        
        # 5. Action Agent (Structures the final response string)
        final_text = action_agent.run(
            extracted_symptoms, 
            conditions, 
            risk_level, 
            compliance_data
        )
        
        # 6. Audit Logger (Records the entire pipeline safely)
        logger_instance.log_interaction(
            user_input=user_input,
            symptom_agent_output=extracted_symptoms,
            knowledge_agent_output=conditions,
            decision_agent_output=risk_level,
            compliance_agent_output=compliance_data,
            action_agent_output={"text_response": final_text}
        )
        
        return AnalyzeResponse(formatted_response=final_text)

    except Exception as e:
        print(f"Pipeline Error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error occurred while processing the request.")

@app.get("/logs")
async def get_logs():
    """
    Returns all stored interactions from the audit logger.
    """
    return logger_instance.get_all_logs()

if __name__ == "__main__":
    # To run locally: python main.py
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

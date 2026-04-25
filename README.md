# 🏥 MediFlow AI — Autonomous Healthcare Multi-Agent System 🚀

*A complete, enterprise-grade AI healthcare pipeline built for hackathon dominance.*

---

## 🌟 Overview
**MediFlow AI** is a state-of-the-art, **Multi-Agent Pipeline System** designed to assist users with emergency medical situations, symptom analysis, and home care. 

Unlike standard LLM chatbots, MediFlow AI operates as a deeply structured **autonomous pipeline**. It routes user input through multiple specialized AI agents to extract symptoms, determine the risk classification (LOW / MEDIUM / EMERGENCY), generate highly actionable first-aid steps, enforce strict medical compliance guardrails, and log every interaction for auditing.

The system comes with a clean, beautifully designed **Next.js Glassmorphism UI** connected directly to the **Python FastAPI** AI pipeline.

---

## 🤖 The Multi-Agent Architecture
Every single user input passes through a complex pipeline consisting of **6 Autonomous Components**:

1. **Symptom Analyzer Agent** 🕵️‍♂️
   - Extracts, cleans, and normalizes raw symptoms from natural language text.
2. **Knowledge Agent** 🧠
   - Uses Google Gemini API to query a massive medical database and securely identify possible conditions.
3. **Decision Agent** ⚖️
   - Performs critical risk classification (**🟢 LOW / 🟡 MEDIUM / 🚨 EMERGENCY**) based strictly on logic, symptom severity, and emergency keywords (e.g., chest pain, difficulty breathing, choking).
4. **Compliance Agent** 🛡️
   - The safety net. It strictly enforces a highly actionable 8-part UI format for the user, ensures no prescription drugs or dangerous procedures are recommended, and enforces emergency handling protocols.
5. **Action Agent** 🏗️
   - Formats the consolidated JSON and ensures the output string is pristine and ready to display.
6. **Audit Logger** 📜
   - Silently records every input, output, pipeline decision, and timestamp into `audit_logs.json` for legal trace and medical auditing.

---

## 🛠️ Technology Stack
- **Backend AI Engine**: Python 3, FastAPI, Uvicorn, Pydantic
- **LLM Engine**: Google Gemini API (`gemini-2.5-flash`)
- **Frontend UI**: Next.js 14, React, Tailwind CSS, TypeScript
- **State Management**: React Hooks (`useState`, `useEffect`)

---

## ⚡ Quick Start Guide (Run it Locally)

You need **two** terminal windows to run MediFlow AI — one for the AI Brain (Python backend) and one for the User Interface (Next.js frontend).

### Step 1: Start the Python Multi-Agent Backend
1. Open a terminal and navigate to the `backend/` folder.
2. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
3. Create a `.env` file in the `backend/` directory and add your Gemini API Key:
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. Start the FastAPI pipeline:
   ```bash
   python main.py
   ```
   *(Running on `http://localhost:8000`)*

### Step 2: Start the Next.js UI
1. Open a **brand new terminal window**.
2. Navigate to the `first-aid-advisor/` frontend directory.
3. Install the required packages:
   ```bash
   npm install
   ```
4. Start the frontend server:
   ```bash
   npm run dev
   ```
5. Open your browser to **[http://localhost:3000](http://localhost:3000)** and start chatting!

---

## 💡 Example Hackathon Prompts

Test out the Risk Classification Engine in live time by throwing these at the chatbot:

🔴 **Emergency Trigger**:
> *"My grandpa collapsed, he is grabbing his chest experiencing severe chest pain and severe shortness of breath."*

🟡 **Medium Risk Trigger**:
> *"I have a high fever, I've been vomiting since this morning, and I feel extremely weak."*

🟢 **Low Risk Trigger**:
> *"I have a slight headache and a scratchy throat. Do you have any advice?"*

---

## 🔒 Medical Disclaimer
**MediFlow AI is for educational and informational purposes only.** It is a hackathon project, not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

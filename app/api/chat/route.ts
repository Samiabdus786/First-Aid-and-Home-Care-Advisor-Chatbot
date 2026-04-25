export const config = {
  runtime: 'nodejs',
};

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const userMessage = messages[messages.length - 1].content;

    // Call our new FastApi Multi-Agent Backend
    const backendUrl = "http://127.0.0.1:8000/analyze";
    
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symptoms: userMessage })
    });

    if (!response.ok) {
        throw new Error("FastAPI Backend request failed or is offline. Please make sure python main.py is running!");
    }

    const data = await response.json();

    // The backend now natively provides a highly detailed, actionable markdown string!
    // We simply forward data.formatted_response to the UI.
    const formattedResponse = data.formatted_response;

    return NextResponse.json({ response: formattedResponse });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to process request', details: error.message },
      { status: 500 }
    );
  }
}

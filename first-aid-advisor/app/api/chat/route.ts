export const config = {
  runtime: 'nodejs',
};

import { NextRequest, NextResponse } from 'next/server';

const API_KEY = "AIzaSyCqsIakvLfyPIC_5ZhnQ7_w3m7KMzKmXTc";
const MODEL = "gemini-1.5-pro-latest";

function timeoutFetch(fetchPromise: Promise<any>, ms: number) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timed out")), ms)
  );
  return Promise.race([fetchPromise, timeout]);
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const userMessage = messages[messages.length - 1].content;

    const body = {
      contents: [{
        parts: [{
          text: userMessage
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000
      }
    };

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
    
    const response = await timeoutFetch(fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }), 30000); // 30s timeout

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'API request failed');
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ response: generatedText });

  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Failed to process request',
        details: error.message,
        solution: 'Check for timeouts, network issues, or long LLM delays.'
      },
      { status: 500 }
    );
  }
}

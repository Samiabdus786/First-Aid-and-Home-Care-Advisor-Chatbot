import { NextRequest, NextResponse } from 'next/server';

const API_KEY = "AIzaSyCqsIakvLfyPIC_5ZhnQ7_w3m7KMzKmXTc";
const MODEL = "gemini-1.5-pro-latest";

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

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'API request failed');
      }
      
      const generatedText = data.candidates[0].content.parts[0].text;
      return NextResponse.json({ response: generatedText });
    } catch (apiError) {
      throw apiError;
    }

  } catch (error: any) {
    return NextResponse.json(
      { 
        error: 'Failed to process request',
        details: error.message,
        solution: 'This exact code works in PowerShell - check CORS/network issues'
      },
      { status: 500 }
    );
  }
}
// app/api/chat/route.ts
import { NextResponse } from 'next/server';

const XAI_API_KEY = process.env.XAI_API_KEY;

export async function POST(request: Request) {
  if (!XAI_API_KEY) {
    return NextResponse.json({ reply: "API key not set in Vercel." });
  }

  try {
    const { message } = await request.json();

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${XAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "grok-beta",
        messages: [
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 600,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return NextResponse.json({ reply });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ 
      reply: "Sorry, Grok is having trouble right now. Please try again." 
    });
  }
}
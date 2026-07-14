// app/api/chat/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const XAI_API_KEY = process.env.XAI_API_KEY;

  if (!XAI_API_KEY) {
    return NextResponse.json({ 
      reply: "API key is not configured. Please check Vercel Environment Variables." 
    });
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
        messages: [{ role: "user", content: message }],
        temperature: 0.7,
        max_tokens: 700,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API Error:", data);
      return NextResponse.json({ reply: "Grok API error. Please try again." });
    }

    const reply = data.choices?.[0]?.message?.content || "I received your message.";
    return NextResponse.json({ reply });

  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({ 
      reply: "Sorry, I'm having trouble connecting right now. Please try again." 
    });
  }
}
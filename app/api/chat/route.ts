// app/api/chat/route.ts
import { NextResponse } from 'next/server';

const XAI_API_KEY = process.env.XAI_API_KEY;

export async function POST(request: Request) {
  if (!XAI_API_KEY) {
    return NextResponse.json({ reply: "API key is not configured. Please check Vercel settings." }, { status: 500 });
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
        model: "grok-2-1212",   // More reliable model name
        messages: [
          { 
            role: "system", 
            content: "You are a helpful and friendly AI for a.wales. Focus on Wales, UK, and general knowledge. Be concise and useful." 
          },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 700,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("xAI API error:", data);
      return NextResponse.json({ reply: "Sorry, Grok is having trouble right now. Please try again." });
    }

    const reply = data.choices?.[0]?.message?.content || "I received your message but couldn't generate a reply.";

    return NextResponse.json({ reply });

  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({ 
      reply: "Connection error. Please check your internet and try again." 
    });
  }
}
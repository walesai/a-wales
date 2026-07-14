// app/api/chat/route.ts
import { NextResponse } from 'next/server';

const XAI_API_KEY = process.env.XAI_API_KEY;

export async function POST(request: Request) {
  if (!XAI_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
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
        model: "grok-beta",           // or "grok-2-1212" if available
        messages: [
          {
            role: "system",
            content: "You are a helpful, friendly AI assistant for a.wales. You have strong knowledge about Wales, Cardiff, Welsh culture, language, and current events. Be concise and engaging."
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'API error');
    }

    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json({ 
      reply: "Sorry, I'm having trouble connecting to Grok right now. Please try again." 
    });
  }
}
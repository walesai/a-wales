// app/api/chat/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const XAI_API_KEY = process.env.XAI_API_KEY;

  if (!XAI_API_KEY) {
    return NextResponse.json({ reply: "❌ API key not found in Vercel settings." });
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
        model: "grok-2-1212",   // Try this model
        messages: [{ role: "user", content: message }],
        temperature: 0.7,
        max_tokens: 600,
      }),
    });

    const data = await response.json();

    console.log("xAI Response Status:", response.status);
    console.log("xAI Response Body:", data);

    if (!response.ok) {
      return NextResponse.json({ 
        reply: `❌ Grok Error: ${data.error?.message || response.status}` 
      });
    }

    const reply = data.choices?.[0]?.message?.content || "No response.";
    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error("Full error:", error);
    return NextResponse.json({ reply: "Connection failed. Please try again." });
  }
}
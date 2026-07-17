// app/api/chat/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message, isWelsh, currentDateTime } = await request.json();

    const systemPrompt = `You are Grok, a helpful and truthful AI built by xAI.
You are chatting on a.wales - a Welsh AI platform.
${currentDateTime || 'Use your knowledge of current events.'}
Always respond in ${isWelsh ? 'Welsh' : 'English'}.
Be accurate, helpful, and witty when appropriate.`;

    const res = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.XAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'grok-3',           // Change to 'grok-beta' if needed
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1200,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('xAI API error:', data);
      return NextResponse.json({ reply: "Sorry, I'm having trouble connecting right now." });
    }

    const reply = data.choices?.[0]?.message?.content || "I couldn't generate a response.";

    return NextResponse.json({ reply });

  } catch (error) {
    console.error('Chat route error:', error);
    return NextResponse.json({ reply: "Sorry, something went wrong on my end." });
  }
}
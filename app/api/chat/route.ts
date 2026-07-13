import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { messages } = await request.json();

  try {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer xai-u9xigO8ld5DeAuNtxim49ArnkeeI9UjqcZXGm2LbFqLovnbTjAhBvcKs94ifh2L86LZZDx2kFeppdUAY'
      },
      body: JSON.stringify({
        model: "grok-3",
        messages: messages,
        temperature: 0.7,
      })
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 });
  }
}
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const response = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'grok-4',        // or grok-3, grok-beta etc.
      messages: messages,
      temperature: 0.7,
      max_tokens: 2048,
      stream: false,
    }),
  });

  const data = await response.json();
  return Response.json(data);
}
import { NextRequest } from 'next/server';
import { marked } from 'marked';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.GROK_API_KEY) {
      return Response.json({ error: 'GROK_API_KEY not configured' }, { status: 500 });
    }

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'grok-4',
        messages: messages,
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json({ error: data.error?.message || 'API error' }, { status: response.status });
    }

    // Server-side markdown parsing
    const rawContent = data.choices[0].message.content;
    const htmlContent = marked.parse(rawContent);

    return Response.json({
      ...data,
      choices: [{
        ...data.choices[0],
        message: {
          ...data.choices[0].message,
          content: htmlContent
        }
      }]
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

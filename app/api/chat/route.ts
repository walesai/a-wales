// app/api/chat/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { messages, isWelsh, generateImage } = await request.json();

    // ========== IMAGE GENERATION ==========
if (generateImage) {
  const lastUserMessage = [...messages].reverse().find((m: any) => m.role === 'user');
  const prompt = lastUserMessage?.content || 'a beautiful landscape';

  const imageRes = await fetch('https://api.x.ai/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.XAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'grok-imagine-image',
      prompt: prompt,
      n: 1,
      response_format: 'b64_json', // ← important
    }),
  });

  const imageData = await imageRes.json();

  const b64 = imageData?.data?.[0]?.b64_json;

  if (!b64) {
    return NextResponse.json({
      reply: isWelsh
        ? "Methu creu'r ddelwedd. Ceisiwch eto."
        : "Couldn't generate the image. Please try again.",
    });
  }

  // Turn it into a proper data URL
  const imageUrl = `data:image/jpeg;base64,${b64}`;

  return NextResponse.json({
    reply: isWelsh ? 'Dyma dy ddelwedd:' : 'Here’s your image:',
    imageUrl,
  });
}

    // ========== NORMAL CHAT ==========
    const systemPrompt = `You are Grok, a helpful AI on a.wales.
Respond in ${isWelsh ? 'Welsh' : 'English'}.
Use the full conversation history to answer follow-up questions.`;

    const res = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.XAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'grok-3',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        temperature: 0.7,
      }),
    });

    const data = await res.json();
    const reply =
      data.choices?.[0]?.message?.content ||
      "Sorry, I couldn't generate a response.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({
      reply: "Sorry, something went wrong.",
    });
  }
}
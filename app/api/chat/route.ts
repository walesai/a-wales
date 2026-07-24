// app/api/chat/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { messages, isWelsh, generateImage } = await request.json();

    // ========== IMAGE GENERATION ==========
    if (generateImage) {
      // Get the latest user message as the prompt
      const lastUserMessage = [...messages].reverse().find((m: any) => m.role === 'user');
      const prompt = lastUserMessage?.content || 'a beautiful landscape';

      const imageRes = await fetch('https://api.x.ai/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.XAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'grok-imagine-image', // cheaper & fast. Change to 'grok-imagine-image-quality' for better results
          prompt: prompt,
          n: 1,
        }),
      });

      const imageData = await imageRes.json();

      // Handle different possible response shapes
      const imageUrl =
        imageData.data?.[0]?.url ||
        imageData.url ||
        imageData.images?.[0]?.url ||
        null;

      if (!imageUrl) {
        return NextResponse.json({
          reply: isWelsh
            ? "Methu creu'r ddelwedd. Ceisiwch eto."
            : "Couldn't generate the image. Please try again.",
        });
      }

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
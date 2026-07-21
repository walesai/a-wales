import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    console.log('Webhook received:', body);

    // Add your Stripe webhook verification here when ready
    // For now, just acknowledge
    return Response.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return Response.json({ error: 'Webhook failed' }, { status: 400 });
  }
}

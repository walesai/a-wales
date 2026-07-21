import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Webhook placeholder - add your real logic (Stripe, etc.) later
    console.log('Webhook received');
    return Response.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

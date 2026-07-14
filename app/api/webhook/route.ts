// app/api/webhook/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!; // We'll add this later

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle successful subscription
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log('✅ Payment successful for:', session.customer_email || session.customer);
    
    // In a real app you would save to database here
    // For now we log it
  }

  if (event.type === 'customer.subscription.created' || 
      event.type === 'customer.subscription.updated') {
    console.log('Subscription updated:', event.data.object);
  }

  return NextResponse.json({ received: true });
}
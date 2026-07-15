// app/api/webhook/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  console.log(`✅ Webhook received: ${event.type}`);

  // Handle successful checkout
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log('💰 Payment successful for:', session.customer_email || session.customer);
    
    // TODO: In future, save subscription status to database here
    // For now, we rely on Success page activation
  }

  // Handle subscription changes
  if (event.type === 'customer.subscription.created' || 
      event.type === 'customer.subscription.updated' || 
      event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription;
    console.log('📋 Subscription updated:', subscription.status);
  }

  return NextResponse.json({ received: true });
}
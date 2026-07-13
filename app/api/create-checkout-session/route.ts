import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.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!);

export async function POST(request: Request) {
  try {
    const { plan } = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'gbp',
          product_data: {
            name: plan === 'monthly' ? 'a.wales Monthly' : 'a.wales Annual',
          },
          unit_amount: plan === 'monthly' ? 499 : 4900,
        },
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}
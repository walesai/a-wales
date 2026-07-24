import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const { plan } = await request.json();

    // Allow monthly, annual, and pro
    if (!plan || !['monthly', 'annual', 'pro'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    let productName = '';
    let unitAmount = 0;
    let interval: 'month' | 'year' = 'month';

    if (plan === 'monthly') {
      productName = 'a.wales Premium';
      unitAmount = 499; // £4.99
      interval = 'month';
    } else if (plan === 'annual') {
      productName = 'a.wales Premium (Annual)';
      unitAmount = 4900; // £49.00
      interval = 'year';
    } else if (plan === 'pro') {
      productName = 'a.wales Pro';
      unitAmount = 999; // £9.99
      interval = 'month';
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: productName,
            },
            unit_amount: unitAmount,
            recurring: {
              interval: interval,
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
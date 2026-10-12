import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { cancelOrder, finalizeCheckoutSession } from '@/lib/orders';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get('stripe-signature');
  if (!secret || !signature) return NextResponse.json({ error: 'not configured' }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(await req.text(), signature, secret);
  } catch {
    return NextResponse.json({ error: 'invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
    case 'checkout.session.async_payment_succeeded':
      await finalizeCheckoutSession(event.data.object);
      break;
    case 'checkout.session.expired':
    case 'checkout.session.async_payment_failed': {
      const orderId = event.data.object.metadata?.orderId;
      if (orderId) await cancelOrder(orderId);
      break;
    }
  }
  return NextResponse.json({ received: true });
}

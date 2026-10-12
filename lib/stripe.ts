import Stripe from 'stripe';

let client: Stripe | undefined;

export function stripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY fehlt');
  return (client ??= new Stripe(key));
}

export const SHIPPING_CENTS = 490;
export const FREE_SHIPPING_FROM_CENTS = 5000;
export const shippingFor = (subtotalCents: number) => (subtotalCents >= FREE_SHIPPING_FROM_CENTS ? 0 : SHIPPING_CENTS);

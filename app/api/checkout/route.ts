import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { shippingFor, stripe } from '@/lib/stripe';

type Body = { items?: { productId?: string; quantity?: number }[] };

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Body;
  const wanted = new Map<string, number>();
  for (const i of body.items ?? []) {
    const q = Math.floor(Number(i.quantity));
    if (typeof i.productId === 'string' && q > 0) wanted.set(i.productId, (wanted.get(i.productId) ?? 0) + q);
  }
  if (wanted.size === 0) return NextResponse.json({ error: 'Der Warenkorb ist leer.' }, { status: 400 });

  // Prices and stock always come from the database, never from the browser.
  const products = await prisma.product.findMany({ where: { id: { in: [...wanted.keys()] }, active: true } });
  if (products.length !== wanted.size) {
    return NextResponse.json({ error: 'Ein Produkt im Warenkorb ist nicht mehr verfügbar.' }, { status: 409 });
  }
  for (const p of products) {
    if (p.stock < wanted.get(p.id)!) {
      return NextResponse.json({ error: `„${p.name}“ ist nur noch ${p.stock}× verfügbar.` }, { status: 409 });
    }
  }

  const subtotal = products.reduce((n, p) => n + p.priceCents * wanted.get(p.id)!, 0);
  const shipping = shippingFor(subtotal);
  const order = await prisma.order.create({
    data: {
      totalCents: subtotal + shipping,
      shippingCents: shipping,
      items: { create: products.map((p) => ({ productId: p.id, quantity: wanted.get(p.id)!, priceCents: p.priceCents })) },
    },
  });

  const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  try {
    const session = await stripe().checkout.sessions.create({
      mode: 'payment',
      locale: 'de',
      client_reference_id: order.id,
      metadata: { orderId: order.id },
      shipping_address_collection: { allowed_countries: ['DE', 'AT', 'CH', 'NL', 'BE', 'LU', 'DK', 'FR'] },
      line_items: [
        ...products.map((p) => ({
          quantity: wanted.get(p.id)!,
          price_data: { currency: 'eur', unit_amount: p.priceCents, product_data: { name: p.name } },
        })),
        ...(shipping > 0
          ? [{ quantity: 1, price_data: { currency: 'eur', unit_amount: shipping, product_data: { name: 'Versand' } } }]
          : []),
      ],
      success_url: `${site}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/cart`,
    });
    await prisma.order.update({ where: { id: order.id }, data: { stripeSessionId: session.id } });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout failed', err);
    await prisma.order.update({ where: { id: order.id }, data: { status: 'CANCELLED' } });
    return NextResponse.json({ error: 'Die Bezahlung konnte nicht gestartet werden.' }, { status: 502 });
  }
}

import type Stripe from 'stripe';
import { prisma } from './db';

/**
 * Marks the order of a completed Checkout Session as paid and takes the stock.
 * Idempotent: safe to call from the webhook and from the success page, any number of times.
 */
export async function finalizeCheckoutSession(session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.orderId;
  if (!orderId || session.payment_status !== 'paid') return null;

  return prisma.$transaction(async (tx) => {
    const claimed = await tx.order.updateMany({
      where: { id: orderId, status: 'PENDING' },
      data: {
        status: 'PAID',
        email: session.customer_details?.email ?? undefined,
        name: session.customer_details?.name ?? undefined,
      },
    });
    if (claimed.count === 1) {
      const items = await tx.orderItem.findMany({ where: { orderId } });
      for (const i of items) {
        await tx.product.updateMany({
          where: { id: i.productId, stock: { gte: i.quantity } },
          data: { stock: { decrement: i.quantity } },
        });
      }
    }
    return tx.order.findUnique({ where: { id: orderId }, include: { items: { include: { product: true } } } });
  });
}

export async function cancelOrder(orderId: string) {
  await prisma.order.updateMany({ where: { id: orderId, status: 'PENDING' }, data: { status: 'CANCELLED' } });
}

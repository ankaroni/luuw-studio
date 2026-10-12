import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { dateTime, eur } from '@/lib/format';

export const dynamic = 'force-dynamic';

const FULFILLMENT = ['NEW', 'SHIPPED', 'DONE'] as const;
const fulfillmentLabel = { NEW: 'Neu', SHIPPED: 'Versendet', DONE: 'Abgeschlossen' } as const;
const payLabel = { PENDING: 'Ausstehend', PAID: 'Bezahlt', CANCELLED: 'Storniert', REFUNDED: 'Erstattet' } as const;

async function setFulfillment(formData: FormData) {
  'use server';
  await requireAdmin();
  const value = String(formData.get('fulfillment'));
  if (!(FULFILLMENT as readonly string[]).includes(value)) return;
  await prisma.order.update({ where: { id: String(formData.get('id')) }, data: { fulfillment: value as (typeof FULFILLMENT)[number] } });
  revalidatePath('/admin/orders');
}

export default async function Orders() {
  await requireAdmin();
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 200,
    include: { items: { include: { product: true } } },
  });
  return (
    <>
      <h1 className="display text-4xl mb-8">Bestellungen</h1>
      <div className="bg-white shadow-soft divide-y divide-line">
        {orders.map((o) => (
          <div key={o.id} className="p-5 text-sm grid gap-2">
            <div className="flex flex-wrap justify-between gap-2">
              <span className="font-semibold">{o.name} <span className="text-muted font-normal">· {o.email}</span></span>
              <span>{eur(o.totalCents)} · {payLabel[o.status]}</span>
            </div>
            <p className="text-muted text-xs">{dateTime(o.createdAt)} · {o.items.map((i) => `${i.quantity}× ${i.product.name}`).join(', ')}</p>
            <form action={setFulfillment} className="flex gap-2 items-center">
              <input type="hidden" name="id" value={o.id} />
              <select name="fulfillment" defaultValue={o.fulfillment} className="border border-line px-2 py-1 text-xs bg-white">
                {FULFILLMENT.map((f) => <option key={f} value={f}>{fulfillmentLabel[f]}</option>)}
              </select>
              <button className="text-sageDeep underline text-xs">Speichern</button>
            </form>
          </div>
        ))}
        {orders.length === 0 && <p className="p-6 text-muted text-sm">Noch keine Bestellungen.</p>}
      </div>
    </>
  );
}

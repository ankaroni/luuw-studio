import Link from 'next/link';
import { ClearCart } from '@/components/ClearCart';
import { SiteShell } from '@/components/SiteShell';
import { eur } from '@/lib/format';
import { finalizeCheckoutSession } from '@/lib/orders';
import { stripe } from '@/lib/stripe';

export const metadata = { title: 'Danke für deine Bestellung | Luuw Studio Hamburg' };
export const dynamic = 'force-dynamic';

export default async function Success({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  let order = null;
  if (session_id?.startsWith('cs_')) {
    try {
      // Also finalizes here, so it works even if the webhook is late or not configured (local dev).
      order = await finalizeCheckoutSession(await stripe().checkout.sessions.retrieve(session_id));
    } catch (err) {
      console.error('Could not load checkout session', err);
    }
  }
  const paid = order?.status === 'PAID';

  return (
    <SiteShell>
      <section className="py-20 md:py-28">
        <div className="container-site max-w-[640px]">
          {paid && <ClearCart />}
          <p className="eyebrow text-terra mb-4">{paid ? 'Bestellung eingegangen' : 'Zahlung wird geprüft'}</p>
          <h1 className="display text-[44px] md:text-[60px] leading-[1.06] tracking-[-.04em]">
            {paid ? <>Danke für deine <em>Bestellung.</em></> : <>Einen Moment <em>noch.</em></>}
          </h1>
          {paid && order ? (
            <div className="mt-8 bg-white p-7 shadow-soft text-sm">
              <p className="text-muted">Bestellnummer: {order.id}</p>
              <ul className="mt-4 divide-y divide-line">
                {order.items.map((i) => (
                  <li key={i.id} className="py-2 flex justify-between"><span>{i.quantity}× {i.product.name}</span><span>{eur(i.priceCents * i.quantity)}</span></li>
                ))}
                {order.shippingCents > 0 && <li className="py-2 flex justify-between"><span>Versand</span><span>{eur(order.shippingCents)}</span></li>}
              </ul>
              <p className="flex justify-between font-semibold mt-3 pt-3 border-t border-line"><span>Gesamt</span><span>{eur(order.totalCents)}</span></p>
              {order.email && <p className="text-muted mt-4">Wir melden uns unter {order.email}.</p>}
            </div>
          ) : (
            <p className="mt-6 text-muted leading-[1.9]">Wir haben deine Zahlung noch nicht bestätigt bekommen. Lade die Seite in ein paar Sekunden neu. Wurde Geld abgebucht, ist die Bestellung trotzdem sicher bei uns angekommen.</p>
          )}
          <Link href="/shop" className="button-fill mt-8">Weiter stöbern ↗</Link>
        </div>
      </section>
    </SiteShell>
  );
}

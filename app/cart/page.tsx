'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/CartProvider';
import { SiteShell } from '@/components/SiteShell';

const eur = (cents: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(cents / 100);
const FREE_SHIPPING_CENTS = 5000;

export default function CartPage() {
  const { items, ready, subtotalCents, setQuantity, remove } = useCart();
  const missing = Math.max(0, FREE_SHIPPING_CENTS - subtotalCents);

  return (
    <SiteShell>
      <section className="py-16 md:py-24">
        <div className="container-site">
          <p className="eyebrow text-terra mb-4">Luuw Onlineshop</p>
          <h1 className="display text-[46px] md:text-[64px] leading-[1.06] tracking-[-.045em]">Dein Warenkorb</h1>

          {!ready ? null : items.length === 0 ? (
            <div className="mt-10">
              <p className="text-muted">Dein Warenkorb ist noch leer.</p>
              <Link href="/shop" className="button-fill mt-6">Zum Shop ↗</Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-16 mt-10 items-start">
              <ul className="divide-y divide-line border-y border-line">
                {items.map((i) => (
                  <li key={i.productId} className="py-6 flex gap-5 items-center">
                    <Link href={`/shop/${i.slug}`} className="relative w-24 h-28 shrink-0 bg-blush overflow-hidden">
                      <Image src={i.image ?? '/assets/studio.svg'} alt={i.name} fill sizes="96px" className="object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/shop/${i.slug}`} className="display text-[22px] block">{i.name}</Link>
                      <p className="text-muted text-[13px] mt-1">{eur(i.priceCents)}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center border border-line">
                          <button aria-label={`Menge von ${i.name} verringern`} className="w-9 h-9" onClick={() => setQuantity(i.productId, i.quantity - 1)}>−</button>
                          <span className="w-8 text-center text-sm" aria-live="polite">{i.quantity}</span>
                          <button aria-label={`Menge von ${i.name} erhöhen`} className="w-9 h-9 disabled:opacity-40" disabled={i.quantity >= i.stock} onClick={() => setQuantity(i.productId, i.quantity + 1)}>+</button>
                        </div>
                        <button className="text-xs underline text-muted" onClick={() => remove(i.productId)}>Entfernen</button>
                      </div>
                    </div>
                    <p className="font-semibold text-sm">{eur(i.priceCents * i.quantity)}</p>
                  </li>
                ))}
              </ul>

              <aside className="bg-white p-7 shadow-soft">
                <h2 className="display text-[28px]">Zusammenfassung</h2>
                <div className="flex justify-between mt-6 text-sm"><span>Zwischensumme</span><span>{eur(subtotalCents)}</span></div>
                <p className="text-[12px] text-muted mt-2">
                  {missing > 0 ? `Noch ${eur(missing)} bis zum kostenlosen Versand.` : 'Du bekommst kostenlosen Versand. ♡'}
                </p>
                <p className="text-[12px] text-muted mt-1">Inkl. MwSt. Versandkosten werden an der Kasse berechnet.</p>
                <button disabled className="button-fill w-full mt-6 opacity-60 cursor-not-allowed">Zur Kasse</button>
                <p className="text-[12px] text-muted mt-3">Die Bezahlung wird gerade eingerichtet.</p>
              </aside>
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}

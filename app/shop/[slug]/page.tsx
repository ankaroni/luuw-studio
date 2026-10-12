import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AddToCart } from '@/components/AddToCart';
import { ProductImage } from '@/components/ProductImage';
import { SiteShell } from '@/components/SiteShell';
import { prisma } from '@/lib/db';
import { eur } from '@/lib/format';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = await prisma.product.findUnique({ where: { slug } });
  return { title: p ? `${p.name} | Luuw Studio Hamburg` : 'Produkt nicht gefunden' };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = await prisma.product.findUnique({ where: { slug } });
  if (!p || !p.active) notFound();

  return (
    <SiteShell>
      <section className="py-12 md:py-20">
        <div className="container-site">
          <Link href="/shop" className="text-link">← Zurück zum Shop</Link>
          <div className="grid md:grid-cols-2 gap-10 lg:gap-20 mt-10 items-start">
            <div className="relative aspect-[.86] overflow-hidden bg-blush">
              <ProductImage src={p.image} alt={p.name} sizes="(min-width:768px) 50vw, 100vw" />
            </div>
            <div>
              <p className="eyebrow text-terra mb-4">{p.category}</p>
              <h1 className="display text-[44px] md:text-[60px] leading-[1.06] tracking-[-.04em]">{p.name}</h1>
              <p className="text-2xl mt-4">{eur(p.priceCents)}</p>
              <p className="text-[12px] text-muted mt-1">inkl. MwSt., zzgl. Versand</p>
              {p.description && <p className="text-muted leading-[1.9] text-[14px] mt-8 max-w-[480px]">{p.description}</p>}
              <p className="text-[13px] mt-6">{p.stock > 0 ? `Auf Lager (${p.stock})` : 'Ausverkauft'}</p>
              <AddToCart product={{ productId: p.id, slug: p.slug, name: p.name, priceCents: p.priceCents, image: p.image, stock: p.stock }} />
              <p className="text-[12px] text-muted mt-3">Die Bezahlung wird gerade eingerichtet.</p>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

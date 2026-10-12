import Link from 'next/link';
import { ProductImage } from '@/components/ProductImage';
import { SiteShell } from '@/components/SiteShell';
import { categories } from '@/lib/data';
import { prisma } from '@/lib/db';
import { eur } from '@/lib/format';

export const metadata = { title: 'Shop | Luuw Studio Hamburg' };
export const dynamic = 'force-dynamic';

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ kategorie?: string }> }) {
  const { kategorie } = await searchParams;
  const active = categories.find((c) => c.id === kategorie);
  const products = await prisma.product.findMany({
    where: { active: true, ...(active && { category: active.id }) },
    orderBy: { createdAt: 'desc' },
  });

  const chip = 'filter-btn';
  return (
    <SiteShell>
      <section className="py-16 md:py-24" aria-labelledby="shop-title">
        <div className="container-site">
          <p className="eyebrow text-terra mb-4">Luuw Onlineshop</p>
          <h1 id="shop-title" className="display text-[46px] md:text-[68px] leading-[1.06] tracking-[-.045em]">Schönes für <em>jeden Tag.</em></h1>
          <div className="flex flex-wrap gap-2.5 mt-8 mb-12" role="group" aria-label="Kategorien">
            <Link href="/shop" className={chip} aria-pressed={!active}>Alle</Link>
            {categories.map((c) => (
              <Link key={c.id} href={`/shop?kategorie=${c.id}`} className={chip} aria-pressed={active?.id === c.id}>{c.title}</Link>
            ))}
          </div>

          {products.length === 0 ? (
            <p className="text-muted">Hier gibt es gerade noch nichts. Schau bald wieder vorbei!</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {products.map((p) => (
                <article key={p.id} className="group">
                  <Link href={`/shop/${p.slug}`} className="block">
                    <div className="relative aspect-[.86] overflow-hidden bg-blush image-zoom">
                      <ProductImage src={p.image} alt={p.name} sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" />
                      {p.stock <= 0 && <span className="absolute top-3 left-3 z-10 bg-[#fffcf7e8] px-3 py-2 eyebrow !text-[9px]">Ausverkauft</span>}
                    </div>
                    <p className="eyebrow text-muted mt-4 !text-[9px]">{p.category}</p>
                    <h2 className="display text-[24px] mt-1">{p.name}</h2>
                    <p className="text-[14px] mt-1">{eur(p.priceCents)}</p>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}

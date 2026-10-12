import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { eur } from '@/lib/format';

export const dynamic = 'force-dynamic';

const slugify = (s: string) =>
  s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

async function createProduct(formData: FormData) {
  'use server';
  await requireAdmin();
  const name = String(formData.get('name') ?? '').trim();
  const priceCents = Math.round(Number(formData.get('price')) * 100);
  const stock = Number(formData.get('stock'));
  if (!name || !(priceCents >= 0) || !(stock >= 0)) return;
  const base = slugify(name) || 'produkt';
  const slug = (await prisma.product.findUnique({ where: { slug: base } })) ? `${base}-${Date.now().toString(36)}` : base;
  await prisma.product.create({
    data: { slug, name, category: String(formData.get('category')), priceCents, stock, description: String(formData.get('description') ?? '') },
  });
  revalidatePath('/admin/products');
}

async function updateProduct(formData: FormData) {
  'use server';
  await requireAdmin();
  const stock = Number(formData.get('stock'));
  const priceCents = Math.round(Number(formData.get('price')) * 100);
  if (!(stock >= 0) || !(priceCents >= 0)) return;
  await prisma.product.update({
    where: { id: String(formData.get('id')) },
    data: { stock, priceCents, active: formData.get('active') === 'on' },
  });
  revalidatePath('/admin/products');
}

const input = 'border border-line px-3 py-2 text-sm bg-white outline-none focus:border-sageDeep';

export default async function Products() {
  await requireAdmin();
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <>
      <h1 className="display text-4xl mb-8">Produkte</h1>
      <form action={createProduct} className="bg-white p-6 shadow-soft grid sm:grid-cols-2 xl:grid-cols-5 gap-3 items-end mb-10">
        <label className="text-xs grid gap-1 xl:col-span-2">Name<input name="name" required className={input} /></label>
        <label className="text-xs grid gap-1">Kategorie
          <select name="category" className={input}><option>Kerzen</option><option>Keraflott</option><option>Geschenke</option></select>
        </label>
        <label className="text-xs grid gap-1">Preis (€)<input name="price" type="number" min={0} step="0.01" required className={input} /></label>
        <label className="text-xs grid gap-1">Bestand<input name="stock" type="number" min={0} defaultValue={0} required className={input} /></label>
        <label className="text-xs grid gap-1 sm:col-span-2 xl:col-span-4">Beschreibung<input name="description" className={input} /></label>
        <button className="button-fill !py-3">Produkt anlegen</button>
      </form>

      <div className="bg-white shadow-soft divide-y divide-line">
        {products.map((p) => (
          <form key={p.id} action={updateProduct} className={`p-4 flex flex-wrap items-center gap-4 text-sm ${p.active ? '' : 'opacity-60'}`}>
            <input type="hidden" name="id" value={p.id} />
            <span className="font-semibold flex-1 min-w-40">{p.name}<span className="block text-xs text-muted font-normal">{p.category} · {eur(p.priceCents)}</span></span>
            <label className="text-xs flex items-center gap-2">€<input name="price" type="number" step="0.01" min={0} defaultValue={(p.priceCents / 100).toFixed(2)} className={`${input} w-24`} /></label>
            <label className="text-xs flex items-center gap-2">Bestand<input name="stock" type="number" min={0} defaultValue={p.stock} className={`${input} w-20`} /></label>
            <label className="text-xs flex items-center gap-2"><input name="active" type="checkbox" defaultChecked={p.active} />Aktiv</label>
            <button className="text-sageDeep underline text-xs">Speichern</button>
          </form>
        ))}
        {products.length === 0 && <p className="p-6 text-muted text-sm">Noch keine Produkte.</p>}
      </div>
    </>
  );
}

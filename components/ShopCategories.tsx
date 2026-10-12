'use client';

import { useState } from 'react';
import { categories } from '@/lib/data';
import { Dialog } from './Dialog';
import { Photo } from './Photo';

export function ShopCategories() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = categories.find((c) => c.id === openId);

  return (
    <section id="shop" className="py-20 md:py-28 scroll-mt-28" aria-labelledby="shop-title">
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <p className="eyebrow text-terra mb-4">01 / Shop the feeling</p>
            <h2 id="shop-title" className="display text-[46px] md:text-[68px] leading-[1.06] tracking-[-.045em]">Schönes für <em>jeden Tag.</em></h2>
            <p className="mt-5 text-muted text-[14px] max-w-[570px] leading-relaxed">Kleine Details, die aus vier Wänden ein Zuhause machen. Von handgemachten Kerzen bis zu liebevollen Deko-Objekten.</p>
          </div>
          <span className="text-link opacity-70 cursor-default">Unsere Lieblingswelten ↘</span>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((c) => (
            <article key={c.id} className="group">
              <button className="block text-left w-full" aria-label={c.aria} onClick={() => setOpenId(c.id)}>
                <div className={`relative aspect-[.86] overflow-hidden image-zoom ${c.bg}`}>
                  <Photo src={c.image} fallback={c.fallback} alt={c.alt} sizes="(min-width:768px) 33vw, 100vw" />
                  <span className="absolute top-4 left-4 bg-[#fffcf7e8] px-3 py-2 eyebrow !text-[9px] z-10">{c.badge}</span>
                </div>
                <div className="pt-5 flex items-center justify-between">
                  <div>
                    <p className="eyebrow text-muted mb-2 !text-[9px]">{c.eyebrow}</p>
                    <h3 className="display text-[31px]">{c.title}</h3>
                  </div>
                  <span className="border border-line rounded-full w-11 h-11 grid place-items-center group-hover:bg-sageDeep group-hover:text-white transition">↗</span>
                </div>
              </button>
            </article>
          ))}
        </div>
        <p className="text-center mt-10 text-[12px] text-muted italic">Ein bisschen hübscher. Ein bisschen gemütlicher. Ein bisschen mehr du.</p>
      </div>

      {active && (
        <Dialog labelledBy="categoryTitle" onClose={() => setOpenId(null)} className="p-4">
          <div className="bg-[#fffaf4] p-8 sm:p-12 max-w-[520px] w-full relative shadow-soft">
            <button data-autofocus className="absolute top-3 right-4 text-3xl" aria-label="Schließen" onClick={() => setOpenId(null)}>×</button>
            <p className="eyebrow text-terra mb-4">Luuw Onlineshop</p>
            <h2 id="categoryTitle" className="display text-[44px]">{active.modalTitle}</h2>
            <p className="text-muted text-[14px] leading-[1.8] mt-5">{active.description}</p>
            <p className="text-[12px] bg-cream2 p-4 mt-6">Hier findest du unsere aktuellen Lieblingsstücke.</p>
            <a className="button-fill mt-7" href={`/shop?kategorie=${active.id}`}>Produkte ansehen ↗</a>
          </div>
        </Dialog>
      )}
    </section>
  );
}

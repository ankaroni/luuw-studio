'use client';

import { useEffect, useState } from 'react';
import { workshopFilters, workshops, type Workshop } from '@/lib/data';
import { Dialog } from './Dialog';
import { Photo } from './Photo';
import { useToast } from './Toast';

export function WorkshopPinboard() {
  const notify = useToast();
  const [filter, setFilter] = useState<(typeof workshopFilters)[number]['id']>('alle');
  const [open, setOpen] = useState<Workshop | null>(null);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      setOpen(workshops.find((w) => w.id === id) ?? null);
    };
    window.addEventListener('open-workshop', onOpen);
    return () => window.removeEventListener('open-workshop', onOpen);
  }, []);

  const visible = workshops.filter((w) => filter === 'alle' || w.type === filter);

  return (
    <section id="workshops" className="pt-20 pb-24 md:pt-28 md:pb-32 bg-[#f5f0e9] scroll-mt-28" aria-labelledby="workshop-title">
      <div className="container-site">
        <div className="max-w-[850px] mx-auto text-center mb-10">
          <div className="eyebrow text-terra mb-4">02 / Kreative Workshops in Hamburg</div>
          <h2 id="workshop-title" className="display text-[52px] sm:text-[68px] md:text-[80px] leading-[1.02] tracking-[-.05em]">Let&apos;s get <em>creative.</em></h2>
          <p className="text-muted text-[14px] md:text-[16px] max-w-[570px] mx-auto leading-[1.9] mt-6">Raus aus dem Alltag, rein ins kreative Glück. Gönn dir eine Auszeit, probiere etwas Neues und nimm am Ende etwas Selbstgemachtes mit nach Hause.</p>
          <p className="script text-terra text-[34px] mt-4">Du brauchst keine Vorkenntnisse ♡</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2.5 mb-12" role="group" aria-label="Workshops filtern">
          {workshopFilters.map((f) => (
            <button key={f.id} className="filter-btn" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>{f.label}</button>
          ))}
        </div>
        <p className="sr-only" role="status" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'Workshop wird' : 'Workshops werden'} angezeigt.
        </p>
        <div className="pinboard relative border-[9px] border-[#d0b698] shadow-[inset_0_4px_13px_#6d523730,0_20px_65px_-32px_#4f3d2c70] p-7 sm:p-11 md:p-16 lg:p-[72px]">
          <div aria-hidden="true" className="absolute top-6 left-5 md:left-10 script text-[30px] text-[#856f56] rotate-[-9deg]">pick your happy place ↘</div>
          <div aria-hidden="true" className="paper-tape top-[-8px] right-[8%]" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-8 lg:gap-6 pt-14 sm:pt-10">
            {visible.map((w) => (
              <button key={w.id} type="button" className="workshop-card polaroid block w-full text-left" aria-label={`${w.title} Workshop ansehen`} onClick={() => setOpen(w)}>
                <div className={`relative overflow-hidden aspect-[.78] ${w.bg}`}>
                  <Photo src={w.image} fallback={w.fallback} alt={w.alt} sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" />
                </div>
                <div className="pt-4 px-1 pb-1">
                  <span className="eyebrow !text-[8px] text-terra">{w.eyebrow}</span>
                  <h3 className="display text-[27px] lg:text-[25px] mt-1 leading-tight">{w.title}</h3>
                  <div className="mt-2 flex items-center justify-between text-[12px] text-muted"><span>{w.teaser}</span><span className="text-lg" aria-hidden="true">↗</span></div>
                </div>
              </button>
            ))}
          </div>
          <div className="text-center mt-12"><span className="inline-block script text-[#866948] text-[29px] -rotate-3">made by you, loved by you.</span></div>
        </div>
        <div className="mt-10 md:mt-14 text-center">
          <p className="text-muted text-[14px]">Klick auf ein Foto und erfahre mehr über den Workshop.</p>
          <p className="mt-3 text-[12px] text-muted/80">Die Online-Buchung mit Terminen und freien Plätzen folgt in Kürze.</p>
        </div>
      </div>

      {open && (
        <Dialog labelledBy="modalTitle" onClose={() => setOpen(null)} className="p-4 sm:p-8">
          <div className="modal-panel bg-[#fffaf4] w-full max-w-[920px] relative grid md:grid-cols-[.86fr_1.14fr] shadow-[0_35px_90px_#0005]">
            <button data-autofocus aria-label="Fenster schließen" className="absolute z-10 right-4 top-4 bg-[#fffaf4ed] w-10 h-10 rounded-full grid place-items-center text-xl hover:bg-white" onClick={() => setOpen(null)}>×</button>
            <div className="min-h-[280px] md:min-h-[520px] relative">
              <Photo src={open.image.replace('w=650', 'w=900')} fallback={open.fallback} alt={`Inspiration für ${open.title}`} sizes="(min-width:768px) 400px, 100vw" />
            </div>
            <div className="p-8 sm:p-12 md:p-14 flex flex-col justify-center">
              <p className="eyebrow text-terra mb-6">{open.label}</p>
              <h2 id="modalTitle" className="display text-[45px] md:text-[58px] leading-[1.06] tracking-[-.05em]">{open.title}</h2>
              <p className="mt-7 text-muted text-[14px] leading-[1.95]">{open.description}</p>
              <div className="mt-7 bg-[#efe7da] p-5 text-[13px]">
                <p className="font-semibold">Deine kreative Auszeit in Hamburg</p>
                <p className="mt-2 text-muted">Termine, Preise und freie Plätze erscheinen hier, sobald die Online-Buchung startet.</p>
              </div>
              <div className="flex flex-wrap gap-5 items-center mt-8">
                <button type="button" className="button-fill" onClick={() => notify('Die Online-Buchung startet bald. Wir freuen uns auf dich!')}>Termine &amp; Plätze ↗</button>
                <button type="button" className="text-link" onClick={() => setOpen(null)}>Zurück zur Auswahl</button>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </section>
  );
}

'use client';

import { useState } from 'react';
import { photo } from '@/lib/data';
import { Photo } from './Photo';

const DEFAULT = 'Kein Spam. Nur schöne Post. Abmeldung jederzeit möglich.';

export function Newsletter() {
  const [status, setStatus] = useState(DEFAULT);

  return (
    <section id="kontakt" className="bg-[#dedfcf] scroll-mt-24">
      <div className="container-site grid lg:grid-cols-2 gap-10 lg:gap-20 items-center py-16 lg:py-0">
        <div className="relative min-h-[340px] md:min-h-[490px] lg:min-h-[540px] overflow-hidden lg:order-2">
          <Photo src={photo(7233953, 1100)} fallback="/assets/floral-candle.svg" alt="Kreative Blüten-Dekoration beim Kerzenmachen" sizes="(min-width:1024px) 50vw, 100vw" />
        </div>
        <div className="py-5 lg:py-20 lg:order-1">
          <p className="eyebrow text-sageDeep mb-5">Letters from Luuw</p>
          <h2 className="display text-[48px] sm:text-[62px] leading-[1.07] tracking-[-.04em]">Ein bisschen <em>Luuw</em> für dein Postfach.</h2>
          <p className="text-[14px] leading-[1.9] mt-6 text-[#606658] max-w-[470px]">Neue Workshop-Ideen, kleine Inspirationen und schöne Neuigkeiten – ganz entspannt und nur, wenn es etwas zu erzählen gibt.</p>
          <form
            className="mt-8 flex flex-col sm:flex-row gap-2 max-w-[520px]"
            onSubmit={(e) => {
              e.preventDefault();
              setStatus('Design-Demo: Der Newsletter-Dienst ist noch nicht angebunden. Es wurden keine Daten gesendet.');
            }}
          >
            <label htmlFor="newsletterEmail" className="sr-only">Deine E-Mail-Adresse</label>
            <input type="email" id="newsletterEmail" name="email" required placeholder="Deine E-Mail-Adresse" className="min-w-0 w-full bg-[#f9f8f1] border border-[#bac0ab] outline-none focus:border-sageDeep px-5 py-4 text-[13px]" />
            <button type="submit" className="button-fill whitespace-nowrap">Anmelden ↗</button>
          </form>
          <p role="status" aria-live="polite" className="text-[12px] mt-3 text-[#53604a]">{status}</p>
        </div>
      </div>
    </section>
  );
}

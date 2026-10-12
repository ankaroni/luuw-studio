import { photo } from '@/lib/data';
import { Photo } from './Photo';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f4efe7]" aria-labelledby="hero-title">
      <div className="absolute right-0 top-0 bottom-0 w-[15%] opacity-30 soft-grain pointer-events-none" />
      <div className="container-site grid lg:grid-cols-[.93fr_1.07fr] gap-5 lg:gap-14 items-center pt-12 lg:pt-10 pb-14 lg:pb-16 min-h-[690px]">
        <div className="relative z-10 order-2 lg:order-1 lg:py-16">
          <div className="flex items-center gap-4 mb-7">
            <span className="block w-10 h-px bg-terra" />
            <span className="eyebrow text-terra">Handmade &amp; happy • Hamburg</span>
          </div>
          <h1 id="hero-title" className="display text-[55px] sm:text-[72px] xl:text-[91px] leading-[1.03] tracking-[-.055em] max-w-[640px]">
            Kleine Dinge.<br />Großes <span className="italic text-terra">Wohlgefühl.</span>
          </h1>
          <p className="mt-7 text-muted text-[14px] md:text-[16px] leading-[1.9] max-w-[430px]">
            Für ein Zuhause mit Persönlichkeit und Momente, die bleiben. Entdecke besondere Kerzen, handgemachte Lieblingsstücke und kreative Workshops mitten in Hamburg.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-6">
            <a href="#workshops" className="button-fill">Workshops entdecken <span aria-hidden="true">↗</span></a>
            <a href="#shop" className="text-link">Zum Onlineshop <span aria-hidden="true">↗</span></a>
          </div>
          <div className="mt-12 flex items-center gap-4 text-[11px] text-muted">
            <span className="flex items-center justify-center w-10 h-10 rounded-full border border-[#d9c7b9] text-terra text-lg">✳</span>
            <span className="leading-relaxed">Mit Herz gemacht.<br />Für dich gedacht.</span>
          </div>
        </div>
        <div className="relative order-1 lg:order-2 min-h-[440px] sm:min-h-[530px] lg:min-h-[600px] flex items-center justify-end">
          <div className="absolute top-[7%] left-[4%] w-[75%] h-[88%] rounded-t-[220px] rounded-b-[8px] bg-[#e5d4c6]" />
          <div className="hero-photo relative ml-auto w-[85%] h-[430px] sm:h-[520px] lg:h-[570px] overflow-hidden rounded-t-[240px] rounded-b-[8px] shadow-soft">
            <Photo src={photo(18481413, 1200)} fallback="/assets/autumn-candle.svg" alt="Handgemachte Kerzen mit zarten Blüten und warmen Naturtönen" sizes="(min-width:1024px) 600px, 90vw" priority />
          </div>
          <div className="absolute bottom-[7%] -left-[1%] sm:left-[0%] w-[150px] sm:w-[200px] bg-white p-2 rotate-[-8deg] shadow-polaroid">
            <div className="relative w-full h-[130px] sm:h-[174px]">
              <Photo src={photo(7233957, 550)} fallback="/assets/floral-candle.svg" alt="Hände beim Verzieren einer handgemachten Kerze" sizes="200px" />
            </div>
            <p className="script text-center text-[22px] mt-1">handmade with love ♡</p>
          </div>
          <div className="absolute right-[-2%] sm:right-[-4%] top-[10%] bg-[#f5e3c7] text-[#775a45] rotate-[12deg] w-[105px] h-[105px] rounded-full border border-dashed border-[#bda588] flex flex-col items-center justify-center text-center shadow-soft">
            <span className="script text-[24px] leading-[.8]">little</span>
            <span className="eyebrow text-[9px] mt-2">things</span>
            <span className="script text-[20px] leading-[.9]">matter</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center pb-5 text-muted/70"><span className="eyebrow !text-[9px]">scroll to explore ↓</span></div>
    </section>
  );
}

const promises = [
  ['✳', 'Handmade in Hamburg', 'Mit Sorgfalt & Liebe zum Detail'],
  ['♡', 'Besondere Lieblingsstücke', 'Zum Behalten & Verschenken'],
  ['✺', 'Kreative Auszeiten', 'In unseren Workshops'],
];

export function ValuesStrip() {
  return (
    <section aria-label="Unsere Werte" className="border-y border-line bg-[#fffaf3]">
      <div className="container-site grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-line">
        {promises.map(([icon, title, text]) => (
          <div key={title} className="py-7 md:py-9 flex items-center justify-center gap-5">
            <span className="text-2xl text-terra" aria-hidden="true">{icon}</span>
            <div>
              <h2 className="font-semibold text-[13px]">{title}</h2>
              <p className="text-muted text-[12px] mt-1">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

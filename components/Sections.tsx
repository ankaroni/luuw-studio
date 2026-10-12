import { journalPosts, photo } from '@/lib/data';
import { Photo } from './Photo';

export function GiftCta() {
  return (
    <section className="bg-[#e6d6c8] py-16 md:py-20" aria-labelledby="gift-title">
      <div className="container-site text-center">
        <p className="eyebrow text-terra mb-5">For you &amp; your favorite people</p>
        <h2 id="gift-title" className="display text-[41px] md:text-[59px] tracking-[-.04em]">Die schönste Geschenkidee? <em>Gemeinsame Zeit.</em></h2>
        <p className="mt-5 max-w-[640px] mx-auto text-muted text-[14px] leading-[1.9]">Zusammen lachen, Neues ausprobieren und Erinnerungen schaffen. Kreative Momente, die viel länger bleiben als der Nachmittag selbst.</p>
        <a href="#workshops" className="button-fill mt-8">Workshop auswählen ↗</a>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="bg-[#e9e3d6] overflow-hidden scroll-mt-24" aria-labelledby="about-title">
      <div className="grid lg:grid-cols-2 items-stretch min-h-[570px]">
        <div className="relative min-h-[430px] lg:min-h-[570px] overflow-hidden">
          <Photo src={photo(7233956, 1200)} fallback="/assets/studio.svg" alt="Liebevolle Handarbeit an Kerzen im Atelier" sizes="(min-width:1024px) 50vw, 100vw" />
          <div className="absolute bottom-7 left-7 bg-[#fffbf3e6] px-5 py-3 rotate-[-4deg] shadow-soft z-10"><span className="script text-[30px] text-terra">made slowly, with love.</span></div>
        </div>
        <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-[min(9vw,125px)] py-16 lg:py-24 relative">
          <span className="absolute top-10 right-14 script text-[#c8b3a3] text-[65px] rotate-[-12deg]" aria-hidden="true">♡</span>
          <p className="eyebrow text-terra mb-7">Mehr als nur Deko</p>
          <h2 id="about-title" className="display text-[49px] sm:text-[61px] leading-[1.08] tracking-[-.04em]">Hi, wir sind <em>Luuw.</em></h2>
          <p className="text-muted leading-[1.95] text-[14px] md:text-[15px] mt-8 max-w-[510px]">Wir lieben die kleinen Dinge, die den Alltag schöner machen: einen gemütlichen Abend bei Kerzenschein, ein handgemachtes Detail auf dem Lieblingsregal oder das gute Gefühl, etwas ganz Eigenes geschaffen zu haben.</p>
          <p className="text-muted leading-[1.95] text-[14px] md:text-[15px] mt-4 max-w-[510px]">Deshalb verbinden wir bei Luuw Studio handgemachte Wohnaccessoires mit kreativen Workshops – für mehr Leichtigkeit, Persönlichkeit und schöne Erinnerungen.</p>
          <div className="mt-10"><a href="#workshops" className="text-link">Erlebe Luuw Studio <span aria-hidden="true">↗</span></a></div>
        </div>
      </div>
    </section>
  );
}

export function QuoteStrip() {
  return (
    <div className="bg-sageDeep text-[#f9f4e9] py-6 overflow-hidden">
      <div className="container-site flex items-center justify-center gap-5 sm:gap-10 text-center">
        <span className="text-[#c6cfbc] text-xl">✳</span>
        <p className="display italic text-[22px] sm:text-[30px]">create something beautiful, feel something special.</p>
        <span className="text-[#c6cfbc] text-xl">✳</span>
      </div>
    </div>
  );
}

export function Journal() {
  return (
    <section id="journal" className="py-20 md:py-28 scroll-mt-28" aria-labelledby="journal-title">
      <div className="container-site">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow text-terra mb-4">03 / A little inspiration</p>
            <h2 id="journal-title" className="display text-[46px] md:text-[66px] tracking-[-.045em]">Studio <em>Notes.</em></h2>
            <p className="text-muted text-[14px] mt-4">Kleine Ideen für ein kreativeres, gemütlicheres Leben.</p>
          </div>
          <span className="hidden md:block script text-[31px] text-terra -rotate-6">slow days, happy ways ↗</span>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {journalPosts.map((p) => (
            <article key={p.title} className="group">
              <div className="relative aspect-[1.17] overflow-hidden image-zoom bg-[#e5d8ce]">
                <Photo src={p.image} fallback="/assets/studio.svg" alt={p.alt} sizes="(min-width:768px) 33vw, 100vw" />
              </div>
              <p className="eyebrow text-terra mt-6">{p.eyebrow}</p>
              <h3 className="display text-[27px] mt-2">{p.title}</h3>
              <p className="text-muted text-[13px] mt-2 leading-relaxed">{p.text}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-muted text-[11px]">Redaktionelle Themenvorschläge – Blogbeiträge können später verknüpft werden.</p>
      </div>
    </section>
  );
}

export function Footer() {
  const link = 'hover:text-[#e5c3b3]';
  return (
    <footer className="bg-[#3e4739] text-[#f8f3e9] pt-16 pb-8" aria-label="Footer">
      <div className="container-site">
        <div className="grid lg:grid-cols-[1.5fr_.8fr_.8fr_1fr] gap-12 pb-16 border-b border-white/15">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/luuw-studio-logo-white.png" alt="Luuw Studio Hamburg" width={160} height={65} className="object-contain" />
            <p className="text-[#d6d7cf] max-w-[270px] text-[13px] leading-[1.9] mt-7">Handgemachte Lieblingsstücke und kreative Wohlfühlmomente aus Hamburg. Made for the little things.</p>
          </div>
          <div>
            <p className="eyebrow text-[#b4bda8] mb-6">Explore</p>
            <nav className="flex flex-col gap-4 text-[13px]">
              <a href="#shop" className={link}>Unser Shop</a>
              <a href="#workshops" className={link}>Workshops</a>
              <a href="#about" className={link}>Über Luuw</a>
              <a href="#journal" className={link}>Journal</a>
            </nav>
          </div>
          <div>
            <p className="eyebrow text-[#b4bda8] mb-6">Support</p>
            <nav className="flex flex-col gap-4 text-[13px]">
              <a href="#kontakt" className={link}>Kontakt</a>
              <a href="#kontakt" className={link}>Newsletter</a>
              <span className="text-white/50 text-[11px]">Impressum / Datenschutz:<br />Links vor Launch ergänzen</span>
            </nav>
          </div>
          <div>
            <p className="eyebrow text-[#b4bda8] mb-6">From Hamburg with love</p>
            <p className="text-[#d6d7cf] text-[13px] leading-[1.9]">Für dich, für dein Zuhause,<br />für ein bisschen mehr Freude<br />im Alltag.</p>
            <div className="script text-[#e5bca9] text-[31px] mt-4">see you soon ♡</div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-white/55 pt-7 tracking-[.08em]">
          <span>© {new Date().getFullYear()} Luuw Studio Hamburg. Made with love.</span>
          <span>Creative days, cozy nights.</span>
        </div>
      </div>
    </footer>
  );
}

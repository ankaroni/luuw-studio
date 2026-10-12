import { Header } from './Header';
import { Footer } from './Sections';

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:px-4 focus:py-2">Zum Inhalt springen</a>
      <div className="bg-sageDeep text-white py-2.5">
        <div className="container-site flex justify-center md:justify-between items-center gap-4 text-[10px] md:text-[11px] tracking-[.15em] font-medium uppercase">
          <span>Handgemacht mit Liebe in Hamburg <span className="px-2 text-[#bfcab2]">✳</span> Small moments, big feelings</span>
          <span className="hidden md:inline text-[#e7eadf]">Gratis Versand ab 50 €</span>
        </div>
      </div>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}

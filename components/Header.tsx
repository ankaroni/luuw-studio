'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { searchKeywords } from '@/lib/data';
import { useToast } from './Toast';

const left = [
  ['#shop', 'Shop'],
  ['#workshops', 'Workshops'],
  ['#about', 'Über Luuw'],
];
const right = [
  ['#journal', 'Journal'],
  ['#kontakt', 'Newsletter'],
];
const workshopKeys = ['blumen', 'herbst', 'tufting', 'keraflott'];

const Icon = ({ children, size = 20 }: { children: React.ReactNode; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    {children}
  </svg>
);

export function Header() {
  const notify = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSearchOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.toLowerCase().trim();
    const key = Object.keys(searchKeywords).find((word) => q.includes(word));
    if (!key) return notify('Noch kein passender Treffer. Schau gern bei Shop oder Workshops vorbei.');
    setSearchOpen(false);
    location.hash = searchKeywords[key];
    if (workshopKeys.includes(key)) {
      setTimeout(() => window.dispatchEvent(new CustomEvent('open-workshop', { detail: key })), 300);
    }
  };

  const accountToast = () => notify('Das Kundenkonto ist bald verfügbar.');

  return (
    <header className="bg-canvas/95 border-b border-line/80 sticky top-0 z-40 backdrop-blur-md" id="top">
      <div className="container-site flex items-center justify-between h-[80px] md:h-[100px] relative gap-6">
        <nav className="hidden lg:flex items-center gap-9 text-[11px] tracking-[.13em] font-bold uppercase flex-1" aria-label="Hauptnavigation links">
          {left.map(([href, label]) => (
            <a key={href} href={href} className="hover:text-terra transition">{label}</a>
          ))}
        </nav>
        <a href="#top" aria-label="Luuw Studio Startseite" className="flex flex-col items-center leading-none shrink-0">
          <Image src="/assets/luuw-studio-logo.png" alt="Luuw Studio Hamburg" width={160} height={65} priority className="object-contain" />
        </a>
        <div className="flex-1 flex justify-end items-center gap-2 md:gap-5">
          <nav className="hidden lg:flex items-center gap-9 text-[11px] tracking-[.13em] font-bold uppercase mr-4" aria-label="Hauptnavigation rechts">
            {right.map(([href, label]) => (
              <a key={href} href={href} className="hover:text-terra transition">{label}</a>
            ))}
          </nav>
          <button className="icon-button" aria-label="Suche öffnen" aria-expanded={searchOpen} aria-controls="searchbar" onClick={() => setSearchOpen((o) => !o)}>
            <Icon><circle cx="11" cy="11" r="7" /><path d="m16.5 16.5 4.5 4.5" /></Icon>
          </button>
          <button className="icon-button hidden sm:grid" aria-label="Mein Konto" title="Mein Konto" onClick={accountToast}>
            <Icon><circle cx="12" cy="8" r="4" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></Icon>
          </button>
          <button className="icon-button relative" aria-label="Warenkorb" onClick={() => notify('Der Warenkorb ist bald verfügbar. Bestellungen sind noch nicht möglich.')}>
            <Icon><path d="M4 8h16l-1.3 12H5.3L4 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></Icon>
            <span className="absolute top-0 right-0 text-[9px] bg-terra text-white w-3.5 h-3.5 flex items-center justify-center rounded-full">0</span>
          </button>
          <button aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={menuOpen} aria-controls="mobileNav" className="icon-button lg:hidden" onClick={() => setMenuOpen((o) => !o)}>
            <Icon size={23}><path d="M3 7h18M3 12h18M3 17h18" /></Icon>
          </button>
        </div>
      </div>

      {searchOpen && (
        <div id="searchbar" className="border-t border-line bg-[#faf7f2]">
          <form role="search" className="container-site flex py-4 items-center gap-3" onSubmit={submitSearch}>
            <label className="sr-only" htmlFor="siteSearch">Website durchsuchen</label>
            <input id="siteSearch" type="search" autoFocus required value={query} onChange={(e) => setQuery(e.target.value)} className="w-full outline-none bg-transparent py-2 text-sm" placeholder="Wonach suchst du? z. B. Tufting, Kerzen …" />
            <button className="text-link shrink-0" type="submit">Suchen ↗</button>
          </form>
        </div>
      )}

      {menuOpen && (
        <nav id="mobileNav" className="lg:hidden border-t border-line bg-canvas shadow-soft" aria-label="Mobiles Menü">
          <div className="container-site py-4 flex flex-col divide-y divide-line/60 text-sm font-medium">
            {[...left, ...right].map(([href, label]) => (
              <a key={href} className="py-3" href={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
            <button className="py-3 text-left" type="button" onClick={() => { setMenuOpen(false); accountToast(); }}>Mein Konto</button>
          </div>
        </nav>
      )}
    </header>
  );
}

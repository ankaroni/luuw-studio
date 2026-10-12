export function Materials() {
  const left = [
    ['01 —', 'Sojawachs', 'Eine sanfte Basis für dein gemütliches Kerzenlicht.'],
    ['02 —', 'Docht', 'Ein kleines Detail, das den Kerzenmoment möglich macht.'],
  ];
  const right = [
    ['03 —', 'Glas', 'Ein schlichter Rahmen für warmes Licht und feine Farben.'],
    ['04 —', 'Liebevolle Details', 'Florale Akzente und kleine Besonderheiten – je nach Design.'],
  ];
  const Item = ({ n, t, d }: { n: string; t: string; d: string }) => (
    <div className="relative z-10 bg-[#fffaf4]/90 p-3 lg:p-0">
      <span className="script text-[31px] text-terra">{n}</span>
      <h3 className="display text-[24px] mt-1">{t}</h3>
      <p className="text-muted mt-2 text-[13px] leading-relaxed">{d}</p>
    </div>
  );

  return (
    <section id="materialien" className="py-20 md:py-28 bg-[#fffaf4] overflow-hidden" aria-labelledby="material-title">
      <div className="container-site">
        <div className="text-center mb-9 md:mb-14">
          <p className="eyebrow text-terra mb-4">Ein Blick ins Glas</p>
          <h2 id="material-title" className="display text-[43px] md:text-[65px] leading-[1.07] tracking-[-.04em]">Die Liebe steckt <em>im Detail.</em></h2>
          <p className="text-muted mt-5 text-[14px] leading-[1.9] max-w-[590px] mx-auto">Vom Wachs bis zum letzten kleinen Akzent: Die Details machen ein handgemachtes Lieblingsstück besonders.</p>
        </div>
        <div className="relative max-w-[1110px] mx-auto py-4 md:py-12">
          <svg aria-hidden="true" className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1110 530" fill="none" preserveAspectRatio="none">
            <path d="M220 122 C310 122,350 186,439 211" stroke="#b99483" strokeWidth="1.5" strokeDasharray="5 8" />
            <path d="M220 409 C310 409,359 343,446 317" stroke="#b99483" strokeWidth="1.5" strokeDasharray="5 8" />
            <path d="M890 122 C808 122,749 192,666 213" stroke="#b99483" strokeWidth="1.5" strokeDasharray="5 8" />
            <path d="M890 409 C815 409,739 344,662 316" stroke="#b99483" strokeWidth="1.5" strokeDasharray="5 8" />
            <circle cx="439" cy="211" r="4.5" fill="#a76753" />
            <circle cx="446" cy="317" r="4.5" fill="#a76753" />
            <circle cx="666" cy="213" r="4.5" fill="#a76753" />
            <circle cx="662" cy="316" r="4.5" fill="#a76753" />
          </svg>
          <div className="relative grid lg:grid-cols-[1fr_1.32fr_1fr] gap-8 lg:gap-10 items-center">
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-7 lg:gap-28 text-center lg:text-right">
              {left.map(([n, t, d]) => <Item key={t} n={n} t={t} d={d} />)}
            </div>
            <div className="relative mx-auto w-full max-w-[420px] aspect-[.93] flex items-center justify-center">
              <div className="absolute inset-[8%] rounded-full bg-[#f2e5d8] soft-grain" />
              <span aria-hidden="true" className="absolute left-[4%] top-[15%] script text-[#b69278] text-[31px] rotate-[-12deg]">made with luuw.</span>
              <svg role="img" aria-labelledby="candleIllustrationTitle" className="relative w-[92%] h-[96%] drop-shadow-xl"
                viewBox="0 0 380 420" xmlns="http://www.w3.org/2000/svg">
                <title id="candleIllustrationTitle">Illustration einer handgemachten Kerze mit hellem Wachs, Docht,
                  botanischen Details und Glasbehälter</title>
                <defs>
                  <linearGradient id="glassFill" x1="0" y1="0" x2="1" y2="1">
                    <stop stopColor="#fffef4" stopOpacity=".83" />
                    <stop offset=".45" stopColor="#d7bca9" stopOpacity=".2" />
                    <stop offset="1" stopColor="#fff" stopOpacity=".48" />
                  </linearGradient>
                  <linearGradient id="waxFill" x1="0" y1="0" x2="0" y2="1">
                    <stop stopColor="#faf1de" />
                    <stop offset="1" stopColor="#efdec6" />
                  </linearGradient>
                  <radialGradient id="flameFill">
                    <stop stopColor="#ffedb0" />
                    <stop offset=".65" stopColor="#e9a765" />
                    <stop offset="1" stopColor="#d48458" />
                  </radialGradient>
                  <filter id="candleShadow">
                    <feGaussianBlur stdDeviation="8" />
                  </filter>
                </defs>
                <ellipse cx="192" cy="379" rx="117" ry="15" fill="#ab8b70" opacity=".18" filter="url(#candleShadow)" />
                
                <path d="M191 92 C186 80 198 69 192 55 C212 76 211 91 198 102 C190 107 186 102 191 92Z"
                  fill="url(#flameFill)" />
                <path d="M196 113 L195 98" stroke="#514339" strokeWidth="3" strokeLinecap="round" />
                
                <path d="M88 158 Q87 143 109 141 H272 Q294 143 292 159 L281 350 Q278 366 260 368 H117 Q102 366 99 351Z"
                  fill="url(#glassFill)" stroke="#a99588" strokeWidth="3" />
                <path d="M104 176 H276 L268 347 Q267 351 259 353 H119 Q114 351 114 345Z" fill="url(#waxFill)"
                  opacity=".96" />
                <ellipse cx="190" cy="175" rx="86" ry="21" fill="#faf2e2" stroke="#c9b7a4" strokeWidth="2" />
                <ellipse cx="190" cy="160" rx="101" ry="24" fill="#fffaf1" fillOpacity=".31" stroke="#b4a49a"
                  strokeWidth="3" />
                <path d="M107 188 L115 331" stroke="white" strokeWidth="11" strokeLinecap="round" opacity=".43" />
                <path d="M271 186 L263 327" stroke="white" strokeWidth="6" strokeLinecap="round" opacity=".28" />
                
                <path d="M161 270 Q176 256 192 281 Q175 284 161 270Z" fill="#d9a9a2" />
                <path d="M192 281 Q211 255 227 276 Q213 289 192 281Z" fill="#ca8d7d" />
                <path d="M192 281 Q212 298 196 314 Q181 297 192 281Z" fill="#e2b3a5" />
                <path d="M192 281 Q174 307 156 288 Q171 273 192 281Z" fill="#e4c4af" />
                <circle cx="191" cy="282" r="7" fill="#ad765e" />
                <path d="M192 288 Q208 330 227 336" fill="none" stroke="#7e8c70" strokeWidth="3" />
                <path d="M211 323 Q230 308 243 319 Q234 332 211 323Z" fill="#8c9c81" />
                <path d="M218 332 Q235 342 248 334 Q238 323 218 332Z" fill="#b3bca2" />
                <path d="M126 320 Q144 302 154 319 Q146 335 126 320Z" fill="#c3aa8f" opacity=".9" />
                
                <rect x="135" y="197" width="114" height="49" rx="2" fill="#fff9ee" opacity=".93" />
                <text x="192" y="228" fill="#584f42" fontFamily="Georgia,serif" fontSize="30" textAnchor="middle"
                  letterSpacing="-2">luuw.</text>
                <path d="M126 361 Q191 374 260 362" stroke="#fff" strokeWidth="4" opacity=".6" fill="none" />
              </svg>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-7 lg:gap-28 text-center lg:text-left">
              {right.map(([n, t, d]) => <Item key={t} n={n} t={t} d={d} />)}
            </div>
          </div>
        </div>
        <p className="mt-8 text-center text-[11px] text-muted">Illustrative Darstellung einer Kerze. Ausstattung und Materialien können je nach Produkt variieren.</p>
      </div>
    </section>
  );
}

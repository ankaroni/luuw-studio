export type WorkshopType = 'kerzen' | 'keraflott' | 'tufting';

export type Workshop = {
  id: 'blumen' | 'herbst' | 'keraflott' | 'tufting';
  type: WorkshopType;
  title: string;
  label: string;
  eyebrow: string;
  teaser: string;
  description: string;
  image: string;
  fallback: string;
  bg: string;
  alt: string;
};

const pexels = (id: number, w: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const photo = pexels;

export const workshops: Workshop[] = [
  {
    id: 'blumen',
    type: 'kerzen',
    title: 'Blumenkerzen',
    label: 'Candle Workshop / Floral edition',
    eyebrow: 'Candle workshop',
    teaser: 'Blumig & verspielt',
    description:
      'Blüten, Farben und ganz viel Kreativität: In diesem Workshop dreht sich alles um individuell gestaltete Blumenkerzen. Perfekt für alle, die verspielte Details lieben und sich eine entspannte kreative Auszeit wünschen.',
    image: pexels(7233957, 650),
    fallback: '/assets/floral-candle.svg',
    bg: 'bg-[#eed9d0]',
    alt: 'Blumen und natürliche Materialien beim Kerzenworkshop',
  },
  {
    id: 'herbst',
    type: 'kerzen',
    title: 'Herbstkerzen',
    label: 'Candle Workshop / Cozy edition',
    eyebrow: 'Seasonal favorite',
    teaser: 'Cozy & warm',
    description:
      'Warme Farben und gemütliche Herbststimmung: Gestalte deine ganz persönliche Kerzenkreation für die kuscheligste Zeit des Jahres. Ein kreativer Nachmittag mit echtem Cozy-Feeling.',
    image: pexels(18481413, 650),
    fallback: '/assets/autumn-candle.svg',
    bg: 'bg-[#e3c1ac]',
    alt: 'Gemütliche, farbenfrohe Kerzen in warmen Herbsttönen – Symbolbild',
  },
  {
    id: 'keraflott',
    type: 'keraflott',
    title: 'Keraflott',
    label: 'Home Decor Workshop',
    eyebrow: 'Home decor workshop',
    teaser: 'Formen & gestalten',
    description:
      'Schlichte Formen, schöne Texturen und dein eigener Stil. Im Keraflott-Workshop entstehen dekorative Einzelstücke – ganz nach deinen Ideen und Farbvorlieben.',
    image: pexels(5490090, 650),
    fallback: '/assets/keraflott.svg',
    bg: 'bg-[#e2dcd1]',
    alt: 'Minimalistische Dekoformen als Keraflott-Inspiration – Symbolbild',
  },
  {
    id: 'tufting',
    type: 'tufting',
    title: 'Tufting',
    label: 'Textile Art Workshop',
    eyebrow: 'Textile workshop',
    teaser: 'Soft & colorful',
    description:
      'Lust auf Farbe und etwas ganz Neues? Entdecke die Welt der textilen Gestaltung und verwandle eine Idee in ein flauschiges, individuelles Werkstück. Kreativ, abwechslungsreich und definitiv ein Hingucker.',
    image: pexels(10474483, 650),
    fallback: '/assets/tufting.svg',
    bg: 'bg-[#c9c5b4]',
    alt: 'Bunte Textilien werden von Hand gefertigt – Inspiration für Tufting',
  },
];

export const workshopFilters: { id: 'alle' | WorkshopType; label: string }[] = [
  { id: 'alle', label: 'Alle Workshops' },
  { id: 'kerzen', label: 'Kerzen' },
  { id: 'keraflott', label: 'Keraflott' },
  { id: 'tufting', label: 'Tufting' },
];

export const categories = [
  {
    id: 'Kerzen',
    title: 'Kerzenliebe',
    modalTitle: 'Kerzen',
    badge: 'Handgemacht',
    eyebrow: '01 / Handmade candles',
    bg: 'bg-blush',
    image: pexels(7233963, 850),
    fallback: '/assets/floral-candle.svg',
    alt: 'Handgemachte florale Kerze',
    aria: 'Mehr über unsere Kerzen erfahren',
    description:
      'Entdecke Blumenkerzen und dekorative Kerzen, die jedem Raum einen Hauch Persönlichkeit verleihen.',
  },
  {
    id: 'Keraflott',
    title: 'Keraflott',
    modalTitle: 'Keraflott',
    badge: 'Deko & Design',
    eyebrow: '02 / Home details',
    bg: 'bg-cream2',
    image: pexels(5490090, 850),
    fallback: '/assets/keraflott.svg',
    alt: 'Minimalistische Dekorationsobjekte in warmen Beigetönen – Stimmungsbild für Keraflott',
    aria: 'Mehr über Keraflott-Dekoration erfahren',
    description:
      'Für kleine Highlights auf dem Regal oder Tisch: handgemachte Dekoobjekte in organischen Formen und sanften Tönen.',
  },
  {
    id: 'Geschenke',
    title: 'Kleine Geschenke',
    modalTitle: 'Kleine Geschenke',
    badge: 'Zum Verschenken',
    eyebrow: '03 / Thoughtful gifting',
    bg: 'bg-blush',
    image: pexels(4108293, 850),
    fallback: '/assets/studio.svg',
    alt: 'Stimmungsvolle Deko mit Trockenblumen und Kerzen',
    aria: 'Mehr über Geschenke und Lieblingsstücke erfahren',
    description: 'Liebevolle Kleinigkeiten für Lieblingsmenschen – und natürlich auch für dich selbst.',
  },
] as const;

export const journalPosts = [
  {
    image: pexels(4108293, 750),
    alt: 'Blumen und Kerzen für einen gemütlichen Wohnstil',
    eyebrow: 'Home inspiration',
    title: 'Weniger Deko. Mehr Gefühl.',
    text: 'Natürliche Materialien und kleine Highlights für deine persönliche Wohlfühlecke.',
  },
  {
    image: pexels(7233962, 750),
    alt: 'Kreativer Moment bei der Arbeit mit Kerzen und Blumen',
    eyebrow: 'Create & unwind',
    title: 'Deine kleine Auszeit.',
    text: 'Warum es so gut tut, einfach mal mit den eigenen Händen etwas zu gestalten.',
  },
  {
    image: pexels(7234520, 750),
    alt: 'Handarbeit mit Wachs und Kerzenformen',
    eyebrow: 'Behind the scenes',
    title: 'Handmade is a feeling.',
    text: 'Ein kleiner Einblick in die Liebe, die in jedem handgemachten Detail steckt.',
  },
];

export const searchKeywords: Record<string, string> = {
  blumen: '#workshops',
  herbst: '#workshops',
  tufting: '#workshops',
  keraflott: '#workshops',
  workshop: '#workshops',
  kerzen: '/shop',
  candle: '/shop',
  shop: '/shop',
  geschenk: '/shop',
  deko: '/shop',
  newsletter: '#kontakt',
  kontakt: '#kontakt',
  hamburg: '#about',
};

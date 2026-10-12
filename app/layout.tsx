import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Luuw Studio Hamburg',
  description: 'Kerzen, Keraflott und Workshops — handgemacht mit Liebe in Hamburg.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600&family=DM+Mono&family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@400;500;600&display=swap"
        />
      </head>
      <body className="bg-canvas font-sans text-ink">{children}</body>
    </html>
  );
}

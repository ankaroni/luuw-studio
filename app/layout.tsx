import type { Metadata } from 'next';
import { ToastProvider } from '@/components/Toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'Luuw Studio Hamburg | Handmade Pieces & Creative Workshops',
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
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Caveat:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="bg-canvas font-sans text-ink"><ToastProvider>{children}</ToastProvider></body>
    </html>
  );
}

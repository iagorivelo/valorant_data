import type { Metadata } from 'next';
import { Barlow, Barlow_Condensed } from 'next/font/google';
import './globals.css';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
});

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-barlow-condensed',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Valorant Data | Agentes, Armas, Mapas e Coleções',
  description:
    'Explore o arsenal do Valorant — agentes, armas e skins (com chromas e níveis), mapas e coleções, com detalhes completos.',
  keywords: ['valorant', 'agentes', 'armas', 'skins', 'mapas', 'coleções', 'dashboard'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body className="min-h-screen bg-ground text-ink font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

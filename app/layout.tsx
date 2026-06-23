import type { Metadata } from 'next';
import { Barlow, Barlow_Condensed } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { SITE_URL } from '@/utils/site';

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
  metadataBase: new URL(SITE_URL),
  title: 'Valorant Data | Agentes, Armas, Mapas e Coleções',
  description:
    'Explore o arsenal do Valorant — agentes, armas e skins (com chromas e níveis), mapas e coleções, com detalhes completos.',
  keywords: ['valorant', 'agentes', 'armas', 'skins', 'mapas', 'coleções', 'dashboard'],
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body className="min-h-screen bg-ground text-ink font-sans antialiased">
        <Navbar />
        <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
        {modal}
      </body>
    </html>
  );
}

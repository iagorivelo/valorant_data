'use client';

// Header esbelto e translúcido. Vermelho VALORANT apenas no acento: a marca
// recortada e o indicador da aba ativa (derivado da rota atual).

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, Sword, Map, Package } from 'lucide-react';

const TABS: { href: string; label: string; icon: React.ReactNode }[] = [
  { href: '/agentes',  label: 'Agentes',  icon: <Users   size={16} /> },
  { href: '/armas',    label: 'Armas',    icon: <Sword   size={16} /> },
  { href: '/mapas',    label: 'Mapas',    icon: <Map     size={16} /> },
  { href: '/colecoes', label: 'Coleções', icon: <Package size={16} /> },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-ground/80 backdrop-blur-md border-b border-line">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        <Link href="/agentes" className="flex items-center gap-3 select-none">
          <span className="block w-2.5 h-6 bg-accent clip-notch" aria-hidden="true" />
          <span className="font-display text-xl font-bold uppercase tracking-[0.12em] text-ink">
            Valorant<span className="text-ink-faint"> Data</span>
          </span>
        </Link>

        <nav className="flex items-end gap-1 sm:gap-2">
          {TABS.map(({ href, label, icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`relative flex items-center gap-2 px-2.5 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                  active ? 'text-ink' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {icon}
                <span className="hidden md:inline">{label}</span>
                <span
                  className={`absolute -bottom-px left-2 right-2 h-0.5 bg-accent transition-transform duration-300 origin-left ${
                    active ? 'scale-x-100' : 'scale-x-0'
                  }`}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

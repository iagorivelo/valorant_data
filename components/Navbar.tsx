'use client';

// Header esbelto e translúcido. Vermelho VALORANT apenas no acento: a marca
// recortada e o indicador da aba ativa.

import { Users, Sword, Map, Package } from 'lucide-react';
import { Tab } from '@/types/valorant';

interface NavbarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: 'agents',      label: 'Agentes',  icon: <Users   size={16} /> },
  { key: 'weapons',     label: 'Armas',    icon: <Sword   size={16} /> },
  { key: 'maps',        label: 'Mapas',    icon: <Map     size={16} /> },
  { key: 'collections', label: 'Coleções', icon: <Package size={16} /> },
];

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-ground/80 backdrop-blur-md border-b border-line">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        {/* Marca: notch vermelho + wordmark */}
        <div className="flex items-center gap-3 select-none">
          <span className="block w-2.5 h-6 bg-accent clip-notch" aria-hidden="true" />
          <span className="font-display text-xl font-bold uppercase tracking-[0.12em] text-ink">
            Valorant<span className="text-ink-faint"> Data</span>
          </span>
        </div>

        <nav className="flex items-end gap-1 sm:gap-2">
          {TABS.map(({ key, label, icon }) => {
            const active = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => onTabChange(key)}
                aria-current={active ? 'page' : undefined}
                className={`relative flex items-center gap-2 px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                  active ? 'text-ink' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {icon}
                <span className="hidden sm:inline">{label}</span>
                <span
                  className={`absolute -bottom-px left-2 right-2 h-0.5 bg-accent transition-transform duration-300 origin-left ${
                    active ? 'scale-x-100' : 'scale-x-0'
                  }`}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

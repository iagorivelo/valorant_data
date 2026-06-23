'use client';

// Aba de armas: busca + grade. Clicar navega para /armas/[uuid].

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { WeaponCard } from '@/components/WeaponCard';
import { SearchInput } from '@/components/SearchInput';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { normalize, matchesQuery } from '@/utils/text';
import { Weapon } from '@/types/valorant';

export function WeaponsView({ weapons }: { weapons: Weapon[] }) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return q ? weapons.filter((w) => matchesQuery(q, w.displayName, w.shopData?.categoryText)) : weapons;
  }, [weapons, query]);

  return (
    <section className="animate-fade-up">
      <SectionHeader title="Armas" count={weapons.length} />
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Buscar arma por nome ou categoria…"
        resultCount={filtered.length}
        totalCount={weapons.length}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map((weapon) => (
          <WeaponCard key={weapon.uuid} weapon={weapon} onClick={(w) => router.push(`/armas/${w.uuid}`)} />
        ))}
      </div>
    </section>
  );
}

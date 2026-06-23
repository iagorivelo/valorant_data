'use client';

// Aba de armas: busca + grade. Clicar navega para /armas/[uuid].

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { WeaponCard } from '@/components/WeaponCard';
import { SearchInput } from '@/components/SearchInput';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FilterChips } from '@/components/ui/FilterChips';
import { normalize, matchesQuery } from '@/utils/text';
import { Weapon } from '@/types/valorant';

const categoryOf = (w: Weapon) => w.shopData?.categoryText ?? 'Corpo a corpo';

export function WeaponsView({ weapons }: { weapons: Weapon[] }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const names = new Set<string>();
    for (const w of weapons) names.add(categoryOf(w));
    return Array.from(names).sort((x, y) => x.localeCompare(y, 'pt'));
  }, [weapons]);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return weapons.filter(
      (w) =>
        matchesQuery(q, w.displayName, w.shopData?.categoryText) &&
        (category === null || categoryOf(w) === category)
    );
  }, [weapons, query, category]);

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
      <div className="-mt-2 mb-6">
        <FilterChips
          label="Categoria"
          options={categories.map((c) => ({ value: c, label: c }))}
          value={category}
          onChange={setCategory}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map((weapon) => (
          <WeaponCard key={weapon.uuid} weapon={weapon} onClick={(w) => router.push(`/armas/${w.uuid}`)} />
        ))}
      </div>
    </section>
  );
}

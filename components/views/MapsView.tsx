'use client';

// Aba de mapas: busca + grade. Clicar navega para /mapas/[uuid].

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { MapCard } from '@/components/MapCard';
import { SearchInput } from '@/components/SearchInput';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { normalize, matchesQuery } from '@/utils/text';
import { ValorantMap } from '@/types/valorant';

export function MapsView({ maps }: { maps: ValorantMap[] }) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return q ? maps.filter((m) => matchesQuery(q, m.displayName)) : maps;
  }, [maps, query]);

  return (
    <section className="animate-fade-up">
      <SectionHeader title="Mapas" count={maps.length} />
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Buscar mapa por nome…"
        resultCount={filtered.length}
        totalCount={maps.length}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {filtered.map((map) => (
          <MapCard key={map.uuid} map={map} onClick={(m) => router.push(`/mapas/${m.uuid}`)} />
        ))}
      </div>
    </section>
  );
}

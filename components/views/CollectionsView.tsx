'use client';

// Aba de coleções: busca + ordenação + filtro por ano + grade agrupada.
// Clicar navega para /colecoes/[uuid].

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { CollectionsGrid } from '@/components/CollectionsGrid';
import { CollectionsFilter } from '@/components/CollectionsFilter';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { normalize, matchesQuery } from '@/utils/text';
import { bundleMatchesYear, listCollectionYears } from '@/utils/bundleClassifier';
import { Bundle, CollectionSort } from '@/types/valorant';

const SORTERS: Record<CollectionSort, (a: Bundle, b: Bundle) => number> = {
  newest: (a, b) => b.releaseOrder - a.releaseOrder,
  oldest: (a, b) => a.releaseOrder - b.releaseOrder,
  az:     (a, b) => a.displayName.localeCompare(b.displayName, 'pt'),
  za:     (a, b) => b.displayName.localeCompare(a.displayName, 'pt'),
};

export function CollectionsView({ bundles }: { bundles: Bundle[] }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [sort, setSort]   = useState<CollectionSort>('newest');
  const [year, setYear]   = useState<number | null>(null);

  const years = useMemo(() => listCollectionYears(bundles), [bundles]);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    const list = bundles.filter(
      (b) => matchesQuery(q, b.displayName) && (year === null || bundleMatchesYear(b, year))
    );
    return list.sort(SORTERS[sort]);
  }, [bundles, query, sort, year]);

  return (
    <section className="animate-fade-up">
      <SectionHeader title="Coleções" count={bundles.length} />
      <CollectionsFilter
        query={query} onQueryChange={setQuery}
        sort={sort} onSortChange={setSort}
        years={years} year={year} onYearChange={setYear}
        resultCount={filtered.length} totalCount={bundles.length}
      />
      <CollectionsGrid bundles={filtered} onSelect={(b) => router.push(`/colecoes/${b.uuid}`)} />
    </section>
  );
}

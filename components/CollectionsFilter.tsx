'use client';

// Busca + ordenação das coleções. Reusa SearchField/ResultCount do SearchInput.

import { ArrowUpDown } from 'lucide-react';
import { SearchField } from '@/components/ui/SearchField';
import { ResultCount } from '@/components/ui/ResultCount';
import { CollectionSort } from '@/types/valorant';

interface CollectionsFilterProps {
  query: string;
  onQueryChange: (v: string) => void;
  sort: CollectionSort;
  onSortChange: (s: CollectionSort) => void;
  resultCount: number;
  totalCount: number;
  /** Anos disponíveis (decrescente) do circuito Champions/VCT. */
  years: number[];
  /** Ano selecionado, ou null para "Todos". */
  year: number | null;
  onYearChange: (year: number | null) => void;
}

const SORT_OPTIONS: { value: CollectionSort; label: string }[] = [
  { value: 'newest', label: 'Mais Recente' },
  { value: 'oldest', label: 'Mais Antigo'  },
  { value: 'az',     label: 'A → Z'        },
  { value: 'za',     label: 'Z → A'        },
];

export function CollectionsFilter({
  query,
  onQueryChange,
  sort,
  onSortChange,
  resultCount,
  totalCount,
  years,
  year,
  onYearChange,
}: CollectionsFilterProps) {
  const chip = (active: boolean) =>
    `px-3 py-1.5 text-xs font-semibold uppercase tracking-wide border transition-colors ${
      active
        ? 'border-accent text-accent bg-accent/10'
        : 'border-line text-ink-muted hover:text-ink hover:border-ink-faint'
    }`;

  return (
    <div className="mb-6">
      <div className="flex gap-3">
        <SearchField
          className="flex-1"
          value={query}
          onChange={onQueryChange}
          placeholder="Buscar coleção por nome…"
          iconSize={15}
        />

        <div className="relative">
          <ArrowUpDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none" />
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as CollectionSort)}
            aria-label="Ordenar coleções"
            className="field appearance-none pl-9 pr-8 py-3 cursor-pointer min-w-[160px]"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} className="bg-surface">
                {o.label}
              </option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none text-[10px]">▼</span>
        </div>
      </div>

      {years.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-1">Ano</span>
          <button onClick={() => onYearChange(null)} className={chip(year === null)}>
            Todos
          </button>
          {years.map((y) => (
            <button key={y} onClick={() => onYearChange(y)} className={chip(year === y)}>
              {y}
            </button>
          ))}
        </div>
      )}

      <ResultCount
        query={query}
        resultCount={resultCount}
        totalCount={totalCount}
        noun={{ one: 'coleção', many: 'coleções' }}
        emptyPrefix="Nenhuma coleção encontrada para"
      />
    </div>
  );
}

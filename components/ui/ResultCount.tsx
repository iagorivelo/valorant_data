// Linha de contagem de resultados com altura fixa (evita "pulo" de layout).
// Compartilhada por SearchInput e CollectionsFilter.

interface ResultCountProps {
  query: string;
  resultCount: number;
  totalCount: number;
  /** Substantivo no singular/plural — ex.: { one: 'coleção', many: 'coleções' } */
  noun?: { one: string; many: string };
  emptyPrefix?: string;
}

export function ResultCount({
  query,
  resultCount,
  totalCount,
  noun = { one: 'resultado', many: 'resultados' },
  emptyPrefix = 'Nenhum resultado para',
}: ResultCountProps) {
  const isFiltering = query.trim().length > 0;
  const noResults = isFiltering && resultCount === 0;

  return (
    <div className="mt-2.5 h-4">
      {isFiltering && (
        <p className={`text-xs font-medium ${noResults ? 'text-accent' : 'text-ink-faint'}`}>
          {noResults
            ? `${emptyPrefix} "${query}"`
            : `${resultCount} de ${totalCount} ${resultCount !== 1 ? noun.many : noun.one}`}
        </p>
      )}
    </div>
  );
}

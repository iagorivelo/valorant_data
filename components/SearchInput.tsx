'use client';

// Busca simples das abas: campo de busca + contador de resultados.

import { SearchField } from '@/components/ui/SearchField';
import { ResultCount } from '@/components/ui/ResultCount';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  resultCount: number;
  totalCount: number;
}

export function SearchInput({ value, onChange, placeholder, resultCount, totalCount }: SearchInputProps) {
  return (
    <div className="mb-6">
      <SearchField value={value} onChange={onChange} placeholder={placeholder} />
      <ResultCount query={value} resultCount={resultCount} totalCount={totalCount} />
    </div>
  );
}

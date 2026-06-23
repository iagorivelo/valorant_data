// Campo de busca (ícone + input + botão limpar). Usado pelo SearchInput das abas
// e composto pelo CollectionsFilter ao lado do seletor de ordenação.

import { Search, X } from 'lucide-react';

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  iconSize?: number;
  className?: string;
}

export function SearchField({ value, onChange, placeholder, iconSize = 16, className = '' }: SearchFieldProps) {
  const isFiltering = value.trim().length > 0;

  return (
    <div className={`relative ${className}`}>
      <Search
        size={iconSize}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="field pl-11 pr-10 py-3"
      />
      {isFiltering && (
        <button
          onClick={() => onChange('')}
          aria-label="Limpar busca"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink transition-colors p-1"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

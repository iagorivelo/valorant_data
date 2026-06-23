'use client';

// Chips de filtro de seleção única, com opção "Todos". Reutilizado pelo filtro
// de função (agentes) e de ano (coleções).

interface FilterChipsProps<T extends string | number> {
  label: string;
  options: { value: T; label: string }[];
  value: T | null;
  onChange: (value: T | null) => void;
  allLabel?: string;
}

export function FilterChips<T extends string | number>({
  label,
  options,
  value,
  onChange,
  allLabel = 'Todos',
}: FilterChipsProps<T>) {
  if (options.length === 0) return null;

  const chip = (active: boolean) =>
    `px-3 py-1.5 text-xs font-semibold uppercase tracking-wide border transition-colors ${
      active
        ? 'border-accent text-accent bg-accent/10'
        : 'border-line text-ink-muted hover:text-ink hover:border-ink-faint'
    }`;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="eyebrow mr-1">{label}</span>
      <button onClick={() => onChange(null)} className={chip(value === null)}>
        {allLabel}
      </button>
      {options.map((o) => (
        <button key={o.value} onClick={() => onChange(o.value)} className={chip(value === o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

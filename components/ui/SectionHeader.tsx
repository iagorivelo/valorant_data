// Cabeçalho editorial de cada aba: título display + contagem + régua hairline.

interface SectionHeaderProps {
  title: string;
  count: number;
}

export function SectionHeader({ title, count }: SectionHeaderProps) {
  return (
    <div className="flex items-baseline gap-4 mb-6">
      <h2 className="font-display text-3xl sm:text-4xl font-semibold uppercase tracking-wide text-ink leading-none">
        {title}
      </h2>
      <span className="font-mono text-sm text-accent tabular-nums">
        {count.toString().padStart(2, '0')}
      </span>
      <span className="flex-1 h-px bg-line" aria-hidden="true" />
    </div>
  );
}

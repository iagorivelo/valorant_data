// Indicador de carregamento reutilizável: anel giratório + rótulo opcional.
// `role="status"` anuncia o estado a leitores de tela. Em prefers-reduced-motion
// o giro é neutralizado (regra global), mas o rótulo mantém o feedback textual.

interface SpinnerProps {
  size?: number;
  label?: string;
  className?: string;
}

export function Spinner({ size = 40, label, className = '' }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center gap-4 ${className}`}
    >
      <span className="relative block" style={{ width: size, height: size }}>
        <span className="absolute inset-0 rounded-full border-2 border-line" />
        <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent animate-spin" />
      </span>
      {label ? (
        <p className="text-eyebrow font-semibold uppercase text-ink-faint">{label}</p>
      ) : (
        <span className="sr-only">Carregando…</span>
      )}
    </div>
  );
}

'use client';

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-ground flex flex-col items-center justify-center gap-6">
      {/* Marca animada */}
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 border-2 border-line rounded-full" />
        <div className="absolute inset-0 border-2 border-transparent border-t-accent rounded-full animate-spin" />
      </div>

      <div className="text-center">
        <p className="font-display text-xl font-bold uppercase tracking-[0.2em] text-ink">
          Valorant Data
        </p>
        <p className="text-ink-faint text-xs uppercase tracking-[0.25em] mt-2 animate-pulse">
          Carregando o arsenal…
        </p>
      </div>
    </div>
  );
}

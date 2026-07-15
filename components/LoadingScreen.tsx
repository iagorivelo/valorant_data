import { Spinner } from '@/components/ui/Spinner';

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-ground flex flex-col items-center justify-center gap-6">
      <Spinner size={56} />
      <div className="text-center">
        <p className="font-display text-xl font-bold uppercase tracking-[0.2em] text-ink">
          Valorant Data
        </p>
        <p className="text-ink-faint text-xs uppercase tracking-[0.25em] mt-2">
          Carregando o arsenal…
        </p>
      </div>
    </div>
  );
}

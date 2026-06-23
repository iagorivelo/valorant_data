'use client';

// Boundary de erro do dashboard — exibido se a API falhar no servidor.

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Erro ao carregar dados Valorant:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-ground flex flex-col items-center justify-center gap-6 px-6 text-center">
      <AlertTriangle size={44} className="text-accent" />
      <div>
        <p className="font-display text-2xl font-bold uppercase tracking-[0.15em] text-ink">
          Falha ao carregar
        </p>
        <p className="text-ink-muted text-sm mt-2.5 max-w-md leading-relaxed">
          Não foi possível obter os dados do Protocolo VALORANT. Verifique sua conexão e tente novamente.
        </p>
      </div>
      <button
        onClick={reset}
        className="clip-notch px-6 py-2.5 bg-accent text-ground font-semibold uppercase text-sm tracking-wider hover:bg-accent-soft transition-colors"
      >
        Tentar novamente
      </button>
    </div>
  );
}

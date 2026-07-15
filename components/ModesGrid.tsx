'use client';

// Grade de modos de jogo (apresentacional). Cada card mostra ícone, nome,
// duração e descrição do modo, com entrada suave na rolagem.

import { Clock } from 'lucide-react';
import { GameMode } from '@/types/valorant';
import { Img } from '@/components/ui/Img';
import { useReveal } from '@/hooks/useReveal';

function ModeTile({ mode, index }: { mode: GameMode; index: number }) {
  const reveal = useReveal<HTMLDivElement>(index);
  return (
    <div
      ref={reveal.ref}
      onAnimationEnd={reveal.onAnimationEnd}
      style={reveal.style}
      className={`tile p-5 flex gap-4 h-full ${reveal.className}`}
    >
      {mode.displayIcon && (
        <div className="relative w-12 h-12 flex-shrink-0">
          <Img src={mode.displayIcon} alt="" aria-hidden="true" fill sizes="48px" className="object-contain" />
        </div>
      )}
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-ink leading-none">
            {mode.displayName}
          </h3>
          {mode.duration && (
            <span className="inline-flex items-center gap-1 text-eyebrow font-semibold uppercase text-ink-faint">
              <Clock size={10} className="text-accent" />
              {mode.duration}
            </span>
          )}
        </div>
        <p className="text-ink-muted text-sm leading-relaxed mt-2">{mode.description}</p>
      </div>
    </div>
  );
}

export function ModesGrid({ modes }: { modes: GameMode[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
      {modes.map((mode, i) => (
        <ModeTile key={mode.uuid} mode={mode} index={i} />
      ))}
    </div>
  );
}

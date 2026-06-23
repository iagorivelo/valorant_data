// Grade de modos de jogo (apresentacional). Cada card mostra ícone, nome,
// duração e descrição do modo.

import { Clock } from 'lucide-react';
import { GameMode } from '@/types/valorant';
import { Img } from '@/components/ui/Img';

export function ModesGrid({ modes }: { modes: GameMode[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {modes.map((mode) => (
        <div key={mode.uuid} className="bg-surface border border-line p-5 flex gap-4">
          {mode.displayIcon && (
            <div className="w-12 h-12 flex-shrink-0 grid place-items-center">
              <Img src={mode.displayIcon} alt="" aria-hidden="true" className="w-full h-full object-contain" />
            </div>
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-ink leading-none">
                {mode.displayName}
              </h3>
              {mode.duration && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
                  <Clock size={10} className="text-accent" />
                  {mode.duration}
                </span>
              )}
            </div>
            <p className="text-ink-muted text-sm leading-relaxed mt-2">{mode.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

'use client';

// Chromas clicáveis (trocam preview) + Levels clicáveis (abrem vídeo)

import { SkinLevel, WeaponSkin } from '@/types/valorant';
import { Img } from '@/components/ui/Img';

interface SkinEditionsProps {
  skin: WeaponSkin;
  weaponDisplayIcon: string;
  activeChromaIdx: number;
  onChromaSelect: (idx: number) => void;
  onVideoSelect: (level: SkinLevel, idx: number) => void;
}

export function SkinEditions({
  skin,
  activeChromaIdx,
  onChromaSelect,
  onVideoSelect,
}: SkinEditionsProps) {
  const chromas = skin.chromas ?? [];
  const levels = skin.levels ?? [];

  const meaningfulChromas = chromas.filter(
    (c, i) => i === 0 || c.swatch || c.displayIcon || c.fullRender
  );

  return (
    <div className="mt-3 border-t border-line pt-3 space-y-4">

      {meaningfulChromas.length > 0 && (
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">
            Chromas ({meaningfulChromas.length})
          </p>

          <div className="flex flex-wrap gap-2">
            {meaningfulChromas.map((chroma, idx) => {
              const isActive = activeChromaIdx === idx;
              const label =
                chroma.displayName.replace(skin.displayName, '').trim() || 'Base';

              return (
                <button
                  key={chroma.uuid}
                  title={chroma.displayName}
                  onClick={() => onChromaSelect(idx)}
                  className={`flex flex-col items-center gap-1 group/chroma focus:outline-none transition-opacity ${
                    isActive ? 'opacity-100' : 'opacity-55 hover:opacity-100'
                  }`}
                >
                  {chroma.swatch ? (
                    <div
                      className={`relative w-9 h-9 rounded-full overflow-hidden border-2 transition-all duration-150 ${
                        isActive
                          ? 'border-accent scale-110 shadow-[0_0_8px_rgba(255,70,85,0.6)]'
                          : 'border-line group-hover/chroma:border-ink-faint'
                      }`}
                    >
                      <Img src={chroma.swatch} alt={chroma.displayName} className="w-full h-full object-cover" />
                    </div>
                  ) : chroma.displayIcon ? (
                    <div
                      className={`w-11 h-11 bg-ground border p-1 flex items-center justify-center transition-all duration-150 ${
                        isActive
                          ? 'border-accent shadow-[0_0_8px_rgba(255,70,85,0.5)]'
                          : 'border-line group-hover/chroma:border-ink-faint'
                      }`}
                    >
                      <Img src={chroma.displayIcon} alt={chroma.displayName} className="w-full h-full object-contain" />
                    </div>
                  ) : (
                    <div
                      className={`w-9 h-9 bg-ground border flex items-center justify-center transition-all duration-150 ${
                        isActive ? 'border-accent' : 'border-line group-hover/chroma:border-ink-faint'
                      }`}
                    >
                      <span className="text-[9px] text-ink-faint font-bold">{idx + 1}</span>
                    </div>
                  )}

                  <span
                    className={`text-[8px] max-w-[44px] text-center leading-tight truncate transition-colors ${
                      isActive ? 'text-accent font-bold' : 'text-ink-faint'
                    }`}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-[9px] text-ink-faint mt-2 italic">
            Clique em um chroma para trocar a cor do preview ↑
          </p>
        </div>
      )}

      {levels.length > 0 && (
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">
            Níveis ({levels.length})
          </p>

          <div className="flex flex-wrap gap-1.5">
            {levels.map((level, idx) => {
              const hasVideo = !!level.streamedVideo;

              return (
                <div key={level.uuid} className="flex flex-col items-center group/level" title={level.displayName || `Nível ${idx + 1}`}>
                  <button
                    onClick={() => hasVideo && onVideoSelect(level, idx)}
                    disabled={!hasVideo}
                    className={`w-10 h-10 border flex items-center justify-center relative transition-all duration-150 focus:outline-none ${
                      hasVideo
                        ? 'bg-ground border-line hover:border-accent hover:bg-accent/10 cursor-pointer'
                        : 'bg-ground/50 border-line cursor-default opacity-40'
                    }`}
                  >
                    {level.displayIcon ? (
                      <>
                        <Img src={level.displayIcon} alt={level.levelItem ?? `Nível ${idx + 1}`} className="w-6 h-6 object-contain" />
                        {hasVideo && (
                          <span className="absolute inset-0 flex items-center justify-center bg-black/65 opacity-0 group-hover/level:opacity-100 transition-opacity">
                            <span className="text-white text-[11px] font-black">▶</span>
                          </span>
                        )}
                      </>
                    ) : (
                      <span className={`text-[11px] font-bold ${hasVideo ? 'text-ink-muted' : 'text-ink-faint'}`}>
                        {hasVideo ? '▶' : idx + 1}
                      </span>
                    )}
                  </button>
                  <span className="text-[8px] text-ink-faint mt-0.5">Nv.{idx + 1}</span>
                </div>
              );
            })}
          </div>

          {levels.some((l) => l.streamedVideo) && (
            <p className="text-[9px] text-ink-faint mt-1.5 flex items-center gap-1.5">
              <span className="text-[10px]">▶</span>
              Clique nos níveis para ver a animação com som
            </p>
          )}
        </div>
      )}
    </div>
  );
}

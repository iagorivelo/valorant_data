'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { SkinLevel, WeaponSkin } from '@/types/valorant';
import { SkinEditions } from '@/components/SkinEditions';
import { VideoModal } from '@/components/VideoModal';
import { Img } from '@/components/ui/Img';

interface SkinCardProps {
  skin: WeaponSkin;
  weaponDisplayIcon: string;
}

export function SkinCard({ skin, weaponDisplayIcon }: SkinCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [activeChromaIdx, setActiveChromaIdx] = useState(0);
  const [videoLevel, setVideoLevel] = useState<{ level: SkinLevel; idx: number } | null>(null);

  const hasEditions =
    (skin.chromas && skin.chromas.length > 0) ||
    (skin.levels && skin.levels.length > 0);

  const totalEditions = (skin.chromas?.length ?? 0) + (skin.levels?.length ?? 0);

  // Preview resolve: chroma fullRender → chroma displayIcon → skin.displayIcon → arma
  const activeChroma = skin.chromas?.[activeChromaIdx];
  const previewSrc =
    activeChroma?.fullRender ??
    activeChroma?.displayIcon ??
    skin.displayIcon ??
    weaponDisplayIcon;

  return (
    <>
      <div
        className={`bg-surface p-4 border transition-colors ${
          expanded ? 'border-accent/50' : 'border-line hover:border-ink-faint'
        }`}
      >
        <div className="group">
          <div className="relative w-full h-20 mb-2">
            <Img
              key={previewSrc} /* força fade ao trocar chroma */
              src={previewSrc}
              alt={skin.displayName}
              fill
              sizes="(max-width: 768px) 50vw, 200px"
              className="object-contain transition-all duration-300 group-hover:scale-105"
            />
          </div>
          <p className="text-xs font-medium text-center text-ink-muted line-clamp-2 min-h-[2rem]">
            {skin.displayName}
            {activeChromaIdx > 0 && activeChroma && (
              <span className="block text-[10px] text-accent/80 mt-0.5">
                {activeChroma.displayName.replace(skin.displayName, '').trim() || `Chroma ${activeChromaIdx + 1}`}
              </span>
            )}
          </p>
        </div>

        {hasEditions && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className={`mt-3 w-full flex items-center justify-between px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${
              expanded
                ? 'bg-accent/20 text-accent'
                : 'bg-ground text-ink-faint hover:text-accent hover:bg-accent/10'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Layers size={11} />
              Edições de Skins
              <span className="text-[9px] opacity-70">({totalEditions})</span>
            </span>
            {expanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
          </button>
        )}

        {expanded && hasEditions && (
          <SkinEditions
            skin={skin}
            weaponDisplayIcon={weaponDisplayIcon}
            activeChromaIdx={activeChromaIdx}
            onChromaSelect={(idx) => setActiveChromaIdx(idx)}
            onVideoSelect={(level, idx) => setVideoLevel({ level, idx })}
          />
        )}
      </div>

      <VideoModal
        level={videoLevel?.level ?? null}
        skinName={skin.displayName}
        levelIndex={videoLevel?.idx ?? 0}
        onClose={() => setVideoLevel(null)}
      />
    </>
  );
}

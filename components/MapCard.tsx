'use client';

import { ValorantMap } from '@/types/valorant';
import { getMapLore } from '@/data/mapLore';
import { MapPin } from 'lucide-react';
import { CardButton } from '@/components/ui/CardButton';
import { Img } from '@/components/ui/Img';

interface MapCardProps {
  map: ValorantMap;
  onClick: (map: ValorantMap) => void;
}

export function MapCard({ map, onClick }: MapCardProps) {
  const lore = getMapLore(map.displayName);

  return (
    <CardButton
      onClick={() => onClick(map)}
      ariaLabel={`Ver detalhes de ${map.displayName}`}
      className="group overflow-hidden"
      style={{ aspectRatio: '16/9' }}
    >
      <Img
        src={map.splash}
        alt={map.displayName}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ground via-ground/30 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <div className="flex items-center gap-1.5 mb-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <MapPin size={11} className="text-accent" />
          <span className="text-[10px] text-ink-muted uppercase tracking-[0.15em] font-semibold line-clamp-1">
            {lore.subtitle}
          </span>
        </div>

        <h3 className="font-display text-3xl font-bold uppercase text-ink tracking-wide drop-shadow-lg leading-none">
          {map.displayName}
        </h3>

        {map.tacticalDescription && (
          <p className="text-[11px] text-accent font-semibold uppercase tracking-[0.18em] mt-2 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 delay-75">
            {map.tacticalDescription}
          </p>
        )}
      </div>
    </CardButton>
  );
}

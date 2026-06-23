'use client';

import { ValorantMap } from '@/types/valorant';
import { getMapLore } from '@/data/mapLore';
import { MapPin, Crosshair, Info } from 'lucide-react';
import { Img } from '@/components/ui/Img';

interface MapDetailProps {
  map: ValorantMap;
}

export function MapDetail({ map }: MapDetailProps) {
  const lore = getMapLore(map.displayName);

  return (
    <div className="overflow-hidden">

      <div className="relative w-full" style={{ aspectRatio: '21/9' }}>
        <Img
          src={map.splash}
          alt={map.displayName}
          fill
          priority
          sizes="(max-width: 896px) 100vw, 896px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ground via-ground/30 to-transparent" />

        {/* Minimap no canto — se disponível */}
        {map.displayIcon && (
          <div className="absolute bottom-4 right-4 w-20 h-20 border border-line bg-ground/60 backdrop-blur-sm p-1.5">
            <Img
              src={map.displayIcon}
              alt={`Minimapa de ${map.displayName}`}
              fill
              sizes="80px"
              className="object-contain opacity-80"
            />
          </div>
        )}

        {/* Nome + subtítulo sobrepostos na imagem */}
        <div className="absolute bottom-0 left-0 p-8 md:p-10">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={13} className="text-accent flex-shrink-0" />
            <span className="text-sm text-ink-muted font-medium">
              {lore.subtitle}
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold uppercase text-ink leading-none tracking-wide">
            {map.displayName}
          </h2>
          {map.tacticalDescription && (
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {map.tacticalDescription}
            </p>
          )}
        </div>
      </div>

      <div className="p-8 md:p-10 space-y-8">

        {/* Descrição narrativa */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Info size={14} className="text-accent" />
            <h4 className="eyebrow text-accent">Sobre o Mapa</h4>
          </div>
          <p className="text-ink-muted leading-relaxed text-[15px] max-w-prose">
            {lore.description}
          </p>
        </div>

        {/* Descrição narrativa da API (se existir e for diferente) */}
        {map.narrativeDescription && (
          <div className="border-l-2 border-accent/30 pl-4">
            <p className="text-ink-faint text-sm leading-relaxed italic">
              &ldquo;{map.narrativeDescription}&rdquo;
            </p>
          </div>
        )}

        {/* Callouts táticos */}
        {lore.callouts && lore.callouts.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Crosshair size={14} className="text-accent" />
              <h4 className="eyebrow text-accent">Pontos Táticos</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {lore.callouts.map((callout) => (
                <span
                  key={callout}
                  className="px-3 py-1 bg-surface-raised border border-line text-ink-muted text-xs font-semibold uppercase tracking-wide hover:border-accent/50 hover:text-ink transition-colors"
                >
                  {callout}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Coordenadas da API */}
        {map.coordinates && (
          <div className="pt-4 border-t border-line">
            <p className="text-[11px] text-ink-faint uppercase tracking-widest font-mono">
              Coordenadas classificadas:{' '}
              <span className="text-ink-muted">{map.coordinates}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

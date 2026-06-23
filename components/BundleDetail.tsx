'use client';

import { Bundle } from '@/types/valorant';
import { Layers, Tag, FileText } from 'lucide-react';
import { Img } from '@/components/ui/Img';

interface BundleDetailProps {
  bundle: Bundle;
}

export function BundleDetail({ bundle }: BundleDetailProps) {
  const heroImage =
    bundle.verticalPromoImage ?? bundle.displayIcon2 ?? bundle.displayIcon;

  // Calcula "geração" aproximada — cada ~10 bundles = um ato/episódio
  const episode = Math.floor(bundle.releaseOrder / 18) + 1;
  const act     = Math.floor((bundle.releaseOrder % 18) / 6) + 1;

  return (
    <div className="overflow-hidden">

      {heroImage ? (
        <div className="relative w-full" style={{ aspectRatio: '21/9' }}>
          <Img
            src={heroImage}
            alt={bundle.displayName}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />

          {/* Thumb no canto */}
          {bundle.displayIcon && bundle.displayIcon !== heroImage && (
            <div className="absolute bottom-4 right-4 w-16 h-16 border border-line bg-ground/60 backdrop-blur-sm p-1.5">
              <Img src={bundle.displayIcon} alt="" className="w-full h-full object-contain" />
            </div>
          )}

          {/* Nome sobreposto */}
          <div className="absolute bottom-0 left-0 p-8 md:p-10">
            {bundle.displayNameSubText && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-2">
                {bundle.displayNameSubText}
              </p>
            )}
            <h2 className="font-display text-5xl md:text-6xl font-bold uppercase text-ink leading-none tracking-wide">
              {bundle.displayName}
            </h2>
          </div>
        </div>
      ) : (
        // Fallback sem imagem
        <div className="bg-surface-raised px-8 pt-10 pb-6 md:px-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-ground border border-line flex items-center justify-center flex-shrink-0">
              <Layers size={28} className="text-ink-faint" />
            </div>
            <div>
              {bundle.displayNameSubText && (
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-1">
                  {bundle.displayNameSubText}
                </p>
              )}
              <h2 className="font-display text-4xl font-bold uppercase text-ink tracking-wide">
                {bundle.displayName}
              </h2>
            </div>
          </div>
        </div>
      )}

      <div className="p-8 md:p-10 space-y-6">

        {/* Badges de contexto */}
        <div className="flex flex-wrap gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-surface-raised border border-line text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
            <Tag size={10} className="text-accent" />
            Coleção #{bundle.releaseOrder + 1}
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 bg-surface-raised border border-line text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
            Episódio {episode} · Ato {act}
          </span>
        </div>

        {/* Descrição principal */}
        {bundle.description && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText size={13} className="text-accent" />
              <h4 className="eyebrow text-accent">Descrição</h4>
            </div>
            <p className="text-ink-muted leading-relaxed text-[15px] max-w-prose">
              {bundle.description}
            </p>
          </div>
        )}

        {/* Descrição extra */}
        {bundle.extraDescription && (
          <div className="border-l-2 border-accent/30 pl-4">
            <p className="text-ink-faint text-sm leading-relaxed italic">
              {bundle.extraDescription}
            </p>
          </div>
        )}

        {/* Promoção */}
        {bundle.promoDescription && (
          <div className="bg-accent/10 border border-accent/20 p-4">
            <p className="text-accent text-sm font-semibold leading-relaxed">
              {bundle.promoDescription}
            </p>
          </div>
        )}

        {/* Imagem secundária se existir e for diferente */}
        {bundle.displayIcon2 &&
          bundle.displayIcon2 !== heroImage &&
          bundle.displayIcon2 !== bundle.displayIcon && (
            <div>
              <h4 className="eyebrow text-accent mb-3">Arte Alternativa</h4>
              <Img
                src={bundle.displayIcon2}
                alt={`${bundle.displayName} — arte alternativa`}
                className="w-full max-w-sm object-contain border border-line"
              />
            </div>
          )}
      </div>
    </div>
  );
}

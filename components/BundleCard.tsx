'use client';

import { Bundle } from '@/types/valorant';
import { Layers } from 'lucide-react';
import { CardButton } from '@/components/ui/CardButton';
import { Img } from '@/components/ui/Img';

interface BundleCardProps {
  bundle: Bundle;
  onClick: (bundle: Bundle) => void;
}

export function BundleCard({ bundle, onClick }: BundleCardProps) {
  // Prioridade de imagem: verticalPromoImage > displayIcon2 > displayIcon
  const bgImage = bundle.verticalPromoImage ?? bundle.displayIcon2 ?? bundle.displayIcon;
  const thumbImage = bundle.displayIcon ?? bundle.displayIcon2;

  return (
    <CardButton
      onClick={() => onClick(bundle)}
      ariaLabel={`Ver coleção ${bundle.displayName}`}
      className="group overflow-hidden"
    >
      {bgImage ? (
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '2/1' }}>
          <Img
            src={bgImage}
            alt={bundle.displayName}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
        </div>
      ) : (
        <div className="w-full flex items-center justify-center bg-ground" style={{ aspectRatio: '2/1' }}>
          <Layers size={36} className="text-ink-faint" />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-base font-semibold uppercase tracking-wide text-ink leading-tight truncate">
              {bundle.displayName}
            </h3>
            {bundle.displayNameSubText && (
              <p className="text-[11px] text-accent font-semibold uppercase tracking-[0.15em] mt-1">
                {bundle.displayNameSubText}
              </p>
            )}
          </div>

          {thumbImage && (
            <div className="w-10 h-10 flex-shrink-0 overflow-hidden border border-line bg-ground">
              <Img src={thumbImage} alt="" className="w-full h-full object-contain p-1" />
            </div>
          )}
        </div>

        {bundle.description && (
          <p className="text-ink-faint text-xs mt-2.5 line-clamp-2 leading-relaxed">
            {bundle.description}
          </p>
        )}
      </div>
    </CardButton>
  );
}

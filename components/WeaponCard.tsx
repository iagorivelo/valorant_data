'use client';

import { Weapon } from '@/types/valorant';
import { CardButton } from '@/components/ui/CardButton';
import { Img } from '@/components/ui/Img';

interface WeaponCardProps {
  weapon: Weapon;
  onClick: (weapon: Weapon) => void;
  index?: number;
}

export function WeaponCard({ weapon, onClick, index }: WeaponCardProps) {
  return (
    <CardButton
      onClick={() => onClick(weapon)}
      ariaLabel={`Ver detalhes de ${weapon.displayName}`}
      index={index}
      className="group flex flex-col items-center gap-5 p-6"
    >
      <div className="relative w-full h-24 flex-shrink-0">
        <Img
          src={weapon.displayIcon}
          alt={weapon.displayName}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="text-center">
        <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-ink leading-none">
          {weapon.displayName}
        </h3>
        <p className="text-ink-faint text-eyebrow font-semibold uppercase mt-2 group-hover:text-accent transition-colors">
          {weapon.shopData?.categoryText ?? 'Corpo a corpo'}
        </p>
      </div>
    </CardButton>
  );
}

'use client';

import { Weapon } from '@/types/valorant';
import { CardButton } from '@/components/ui/CardButton';
import { Img } from '@/components/ui/Img';

interface WeaponCardProps {
  weapon: Weapon;
  onClick: (weapon: Weapon) => void;
}

export function WeaponCard({ weapon, onClick }: WeaponCardProps) {
  return (
    <CardButton
      onClick={() => onClick(weapon)}
      ariaLabel={`Ver detalhes de ${weapon.displayName}`}
      className="group flex flex-col items-center gap-5 p-6 hover:bg-surface-raised"
    >
      <div className="flex-1 w-full flex items-center justify-center min-h-[6rem]">
        <Img
          src={weapon.displayIcon}
          alt={weapon.displayName}
          className="w-full h-24 object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="text-center">
        <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-ink leading-none">
          {weapon.displayName}
        </h3>
        <p className="text-ink-faint text-[11px] font-semibold uppercase tracking-[0.2em] mt-1.5 group-hover:text-accent transition-colors">
          {weapon.shopData?.categoryText ?? 'Corpo a corpo'}
        </p>
      </div>
    </CardButton>
  );
}

'use client';

import { Weapon } from '@/types/valorant';
import { SkinCard } from '@/components/SkinCard';
import { WeaponStats } from '@/components/WeaponStats';
import { Img } from '@/components/ui/Img';

interface WeaponDetailProps {
  weapon: Weapon;
}

export function WeaponDetail({ weapon }: WeaponDetailProps) {
  return (
    <div className="p-8 md:p-10">
      {/* Hero: ícone + nome + categoria */}
      <div className="text-center mb-12">
        <p className="eyebrow text-accent mb-3">
          {weapon.shopData?.categoryText ?? 'Corpo a corpo'}
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wide text-ink leading-none">
          {weapon.displayName}
        </h2>
        <Img
          src={weapon.displayIcon}
          alt={weapon.displayName}
          className="h-28 md:h-32 mx-auto mt-8 object-contain drop-shadow-[0_0_24px_rgba(255,70,85,0.18)]"
        />
      </div>

      <WeaponStats weapon={weapon} />

      {/* Skins */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-1 h-5 bg-accent" aria-hidden="true" />
        <h4 className="font-display text-xl font-semibold uppercase tracking-wide text-ink">
          Skins
        </h4>
        <span className="font-mono text-sm text-ink-faint tabular-nums">
          {weapon.skins.length.toString().padStart(2, '0')}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {weapon.skins.map((skin) => (
          <SkinCard
            key={skin.uuid}
            skin={skin}
            weaponDisplayIcon={weapon.displayIcon}
          />
        ))}
      </div>
    </div>
  );
}

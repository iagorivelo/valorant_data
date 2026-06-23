import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getWeapon } from '@/services/lookups';
import { WeaponDetail } from '@/components/WeaponDetail';
import { BackLink } from '@/components/ui/BackLink';

export async function generateMetadata({ params }: { params: { uuid: string } }): Promise<Metadata> {
  const weapon = await getWeapon(params.uuid);
  if (!weapon) return { title: 'Arma não encontrada | Valorant Data' };
  const desc = `${weapon.shopData?.categoryText ?? 'Arma'} do Valorant — estatísticas, dano e skins.`;
  return {
    title: `${weapon.displayName} | Valorant Data`,
    description: desc,
    openGraph: {
      title: weapon.displayName,
      description: desc,
      images: weapon.displayIcon ? [weapon.displayIcon] : [],
    },
  };
}

export default async function ArmaPage({ params }: { params: { uuid: string } }) {
  const weapon = await getWeapon(params.uuid);
  if (!weapon) notFound();

  return (
    <div className="max-w-4xl mx-auto">
      <BackLink href="/armas" label="Armas" />
      <article className="bg-surface border border-line">
        <WeaponDetail weapon={weapon} />
      </article>
    </div>
  );
}

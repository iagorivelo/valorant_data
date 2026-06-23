import type { Metadata } from 'next';
import { fetchPlayerCards } from '@/services/valorantApi';
import { CosmeticGallery } from '@/components/CosmeticGallery';

export const metadata: Metadata = {
  title: 'Cartões | Valorant Data',
  description: 'Todos os cartões de jogador do Valorant.',
};

export default async function CartoesPage() {
  const cards = await fetchPlayerCards();
  const items = cards.map((c) => ({
    uuid: c.uuid,
    displayName: c.displayName,
    image: c.largeArt ?? c.displayIcon,
  }));
  return (
    <CosmeticGallery title="Cartões" items={items} searchPlaceholder="Buscar cartão por nome…" variant="card" />
  );
}

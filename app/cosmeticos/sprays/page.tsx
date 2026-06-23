import type { Metadata } from 'next';
import { fetchSprays } from '@/services/valorantApi';
import { CosmeticGallery } from '@/components/CosmeticGallery';

export const metadata: Metadata = {
  title: 'Sprays | Valorant Data',
  description: 'Todos os sprays do Valorant.',
};

export default async function SpraysPage() {
  const sprays = await fetchSprays();
  const items = sprays.map((s) => ({
    uuid: s.uuid,
    displayName: s.displayName,
    image: s.fullTransparentIcon ?? s.displayIcon,
  }));
  return (
    <CosmeticGallery title="Sprays" items={items} searchPlaceholder="Buscar spray por nome…" variant="icon" />
  );
}

import type { Metadata } from 'next';
import { fetchBuddies } from '@/services/valorantApi';
import { CosmeticGallery } from '@/components/CosmeticGallery';

export const metadata: Metadata = {
  title: 'Chaveiros | Valorant Data',
  description: 'Todos os chaveiros (gun buddies) do Valorant.',
};

export default async function ChaveirosPage() {
  const buddies = await fetchBuddies();
  const items = buddies.map((b) => ({
    uuid: b.uuid,
    displayName: b.displayName,
    image: b.displayIcon,
  }));
  return (
    <CosmeticGallery title="Chaveiros" items={items} searchPlaceholder="Buscar chaveiro por nome…" variant="icon" />
  );
}

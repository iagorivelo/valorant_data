import type { Metadata } from 'next';
import { fetchMaps } from '@/services/valorantApi';
import { MapsView } from '@/components/views/MapsView';

export const metadata: Metadata = {
  title: 'Mapas | Valorant Data',
  description: 'Todos os mapas do Valorant: lore, pontos táticos e detalhes.',
};

export default async function MapasPage() {
  const maps = await fetchMaps();
  return <MapsView maps={maps} />;
}

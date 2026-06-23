import type { Metadata } from 'next';
import { fetchWeapons } from '@/services/valorantApi';
import { WeaponsView } from '@/components/views/WeaponsView';

export const metadata: Metadata = {
  title: 'Armas | Valorant Data',
  description: 'Todas as armas do Valorant: estatísticas, dano por distância e skins.',
};

export default async function ArmasPage() {
  const weapons = await fetchWeapons();
  return <WeaponsView weapons={weapons} />;
}

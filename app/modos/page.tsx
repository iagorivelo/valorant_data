import type { Metadata } from 'next';
import { fetchGameModes } from '@/services/valorantApi';
import { ModesGrid } from '@/components/ModesGrid';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: 'Modos de Jogo | Valorant Data',
  description: 'Todos os modos de jogo do Valorant, com duração e descrição.',
};

export default async function ModosPage() {
  const modes = await fetchGameModes();
  return (
    <section className="animate-fade-up">
      <SectionHeader title="Modos de Jogo" count={modes.length} />
      <ModesGrid modes={modes} />
    </section>
  );
}

import type { Metadata } from 'next';
import { fetchCompetitiveTiers } from '@/services/valorantApi';
import { RanksLadder } from '@/components/RanksLadder';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: 'Ranks | Valorant Data',
  description: 'A escada de ranks competitivos do Valorant, de Ferro a Radiante.',
};

export default async function RanksPage() {
  const tiers = await fetchCompetitiveTiers();
  return (
    <section className="animate-fade-up">
      <SectionHeader title="Ranks" count={tiers.length} />
      <RanksLadder tiers={tiers} />
    </section>
  );
}

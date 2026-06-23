import type { Metadata } from 'next';
import { fetchBundles } from '@/services/valorantApi';
import { CollectionsView } from '@/components/views/CollectionsView';

export const metadata: Metadata = {
  title: 'Coleções | Valorant Data',
  description: 'Coleções do Valorant: Champions, cápsulas VCT, times e pacotes, com filtro por ano.',
};

export default async function ColecoesPage() {
  const bundles = await fetchBundles();
  return <CollectionsView bundles={bundles} />;
}

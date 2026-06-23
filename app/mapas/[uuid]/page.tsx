import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMap } from '@/services/lookups';
import { fetchMaps } from '@/services/valorantApi';
import { MapDetail } from '@/components/MapDetail';
import { BackLink } from '@/components/ui/BackLink';

// Pré-renderiza uma página por mapa no build (SSG), reusando o cache ISR.
export async function generateStaticParams() {
  const maps = await fetchMaps();
  return maps.map((m) => ({ uuid: m.uuid }));
}

export async function generateMetadata({ params }: { params: { uuid: string } }): Promise<Metadata> {
  const map = await getMap(params.uuid);
  if (!map) return { title: 'Mapa não encontrado | Valorant Data' };
  const desc = map.narrativeDescription ?? `O mapa ${map.displayName} do Valorant.`;
  return {
    title: `${map.displayName} | Valorant Data`,
    description: desc,
    openGraph: { title: map.displayName, description: desc, images: map.splash ? [map.splash] : [] },
  };
}

export default async function MapaPage({ params }: { params: { uuid: string } }) {
  const map = await getMap(params.uuid);
  if (!map) notFound();

  return (
    <div className="max-w-4xl mx-auto">
      <BackLink href="/mapas" label="Mapas" />
      <article className="bg-surface border border-line overflow-hidden">
        <MapDetail map={map} />
      </article>
    </div>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBundle } from '@/services/lookups';
import { fetchBundles } from '@/services/valorantApi';
import { BundleDetail } from '@/components/BundleDetail';
import { BackLink } from '@/components/ui/BackLink';

// Pré-renderiza uma página por coleção no build (SSG), reusando o cache ISR.
export async function generateStaticParams() {
  const bundles = await fetchBundles();
  return bundles.map((b) => ({ uuid: b.uuid }));
}

export async function generateMetadata({ params }: { params: { uuid: string } }): Promise<Metadata> {
  const bundle = await getBundle(params.uuid);
  if (!bundle) return { title: 'Coleção não encontrada | Valorant Data' };
  const desc = bundle.description ?? `A coleção ${bundle.displayName} do Valorant.`;
  const image = bundle.verticalPromoImage ?? bundle.displayIcon2 ?? bundle.displayIcon;
  return {
    title: `${bundle.displayName} | Valorant Data`,
    description: desc,
    openGraph: { title: bundle.displayName, description: desc, images: image ? [image] : [] },
  };
}

export default async function ColecaoPage({ params }: { params: { uuid: string } }) {
  const bundle = await getBundle(params.uuid);
  if (!bundle) notFound();

  return (
    <div className="max-w-4xl mx-auto">
      <BackLink href="/colecoes" label="Coleções" />
      <article className="bg-surface border border-line overflow-hidden">
        <BundleDetail bundle={bundle} />
      </article>
    </div>
  );
}

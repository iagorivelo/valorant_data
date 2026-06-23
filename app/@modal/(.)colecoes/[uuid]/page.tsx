import { notFound } from 'next/navigation';
import { getBundle } from '@/services/lookups';
import { BundleDetail } from '@/components/BundleDetail';
import { DetailModal } from '@/components/DetailModal';

export default async function ColecaoModal({ params }: { params: { uuid: string } }) {
  const bundle = await getBundle(params.uuid);
  if (!bundle) notFound();
  return (
    <DetailModal>
      <BundleDetail bundle={bundle} />
    </DetailModal>
  );
}

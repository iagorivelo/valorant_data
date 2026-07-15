import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getBundle } from '@/services/lookups';
import { Bundle } from '@/types/valorant';
import { BundleDetail } from '@/components/BundleDetail';
import { DetailModal } from '@/components/DetailModal';
import { ModalDetailFallback } from '@/components/ModalDetailFallback';
import { ModalDetailError } from '@/components/ModalDetailError';

// Parent síncrono → o shell do modal aparece na hora; o conteúdo faz streaming
// dentro do Suspense com um loading enquanto os dados chegam.
export default function ColecaoModal({ params }: { params: { uuid: string } }) {
  return (
    <DetailModal>
      <Suspense fallback={<ModalDetailFallback />}>
        <ColecaoModalContent uuid={params.uuid} />
      </Suspense>
    </DetailModal>
  );
}

async function ColecaoModalContent({ uuid }: { uuid: string }) {
  let bundle: Bundle | null;
  try {
    bundle = await getBundle(uuid);
  } catch (err) {
    console.error('[ColecaoModal] falha ao carregar coleção:', err);
    return <ModalDetailError />;
  }
  if (!bundle) notFound();
  return <BundleDetail bundle={bundle} />;
}

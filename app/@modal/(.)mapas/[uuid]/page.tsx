import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getMap } from '@/services/lookups';
import { ValorantMap } from '@/types/valorant';
import { MapDetail } from '@/components/MapDetail';
import { DetailModal } from '@/components/DetailModal';
import { ModalDetailFallback } from '@/components/ModalDetailFallback';
import { ModalDetailError } from '@/components/ModalDetailError';

// Parent síncrono → o shell do modal aparece na hora; o conteúdo faz streaming
// dentro do Suspense com um loading enquanto os dados chegam.
export default function MapaModal({ params }: { params: { uuid: string } }) {
  return (
    <DetailModal>
      <Suspense fallback={<ModalDetailFallback />}>
        <MapaModalContent uuid={params.uuid} />
      </Suspense>
    </DetailModal>
  );
}

async function MapaModalContent({ uuid }: { uuid: string }) {
  let map: ValorantMap | null;
  try {
    map = await getMap(uuid);
  } catch (err) {
    console.error('[MapaModal] falha ao carregar mapa:', err);
    return <ModalDetailError />;
  }
  if (!map) notFound();
  return <MapDetail map={map} />;
}

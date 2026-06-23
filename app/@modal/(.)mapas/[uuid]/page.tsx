import { notFound } from 'next/navigation';
import { getMap } from '@/services/lookups';
import { MapDetail } from '@/components/MapDetail';
import { DetailModal } from '@/components/DetailModal';

export default async function MapaModal({ params }: { params: { uuid: string } }) {
  const map = await getMap(params.uuid);
  if (!map) notFound();
  return (
    <DetailModal>
      <MapDetail map={map} />
    </DetailModal>
  );
}

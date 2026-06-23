import { notFound } from 'next/navigation';
import { getWeapon } from '@/services/lookups';
import { WeaponDetail } from '@/components/WeaponDetail';
import { DetailModal } from '@/components/DetailModal';

export default async function ArmaModal({ params }: { params: { uuid: string } }) {
  const weapon = await getWeapon(params.uuid);
  if (!weapon) notFound();
  return (
    <DetailModal>
      <WeaponDetail weapon={weapon} />
    </DetailModal>
  );
}

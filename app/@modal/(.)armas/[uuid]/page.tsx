import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getWeapon } from '@/services/lookups';
import { Weapon } from '@/types/valorant';
import { WeaponDetail } from '@/components/WeaponDetail';
import { DetailModal } from '@/components/DetailModal';
import { ModalDetailFallback } from '@/components/ModalDetailFallback';
import { ModalDetailError } from '@/components/ModalDetailError';

// Parent síncrono → o shell do modal aparece na hora; o conteúdo (que busca os
// dados) faz streaming dentro do Suspense com um loading enquanto isso.
export default function ArmaModal({ params }: { params: { uuid: string } }) {
  return (
    <DetailModal>
      <Suspense fallback={<ModalDetailFallback />}>
        <ArmaModalContent uuid={params.uuid} />
      </Suspense>
    </DetailModal>
  );
}

async function ArmaModalContent({ uuid }: { uuid: string }) {
  let weapon: Weapon | null;
  try {
    weapon = await getWeapon(uuid);
  } catch (err) {
    console.error('[ArmaModal] falha ao carregar arma:', err);
    return <ModalDetailError />;
  }
  if (!weapon) notFound();
  return <WeaponDetail weapon={weapon} />;
}

import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getAgentWithContract } from '@/services/lookups';
import { AgentDetail } from '@/components/AgentDetail';
import { DetailModal } from '@/components/DetailModal';
import { ModalDetailFallback } from '@/components/ModalDetailFallback';
import { ModalDetailError } from '@/components/ModalDetailError';

// Parent síncrono → o shell do modal aparece na hora; o conteúdo faz streaming
// dentro do Suspense com um loading enquanto os dados chegam.
export default function AgenteModal({ params }: { params: { uuid: string } }) {
  return (
    <DetailModal>
      <Suspense fallback={<ModalDetailFallback />}>
        <AgenteModalContent uuid={params.uuid} />
      </Suspense>
    </DetailModal>
  );
}

async function AgenteModalContent({ uuid }: { uuid: string }) {
  let data: Awaited<ReturnType<typeof getAgentWithContract>>;
  try {
    data = await getAgentWithContract(uuid);
  } catch (err) {
    console.error('[AgenteModal] falha ao carregar agente:', err);
    return <ModalDetailError />;
  }
  if (!data.agent) notFound();
  return <AgentDetail agent={data.agent} contract={data.contract} />;
}

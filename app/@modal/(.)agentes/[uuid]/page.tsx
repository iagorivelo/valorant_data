import { notFound } from 'next/navigation';
import { getAgentWithContract } from '@/services/lookups';
import { AgentDetail } from '@/components/AgentDetail';
import { DetailModal } from '@/components/DetailModal';

export default async function AgenteModal({ params }: { params: { uuid: string } }) {
  const { agent, contract } = await getAgentWithContract(params.uuid);
  if (!agent) notFound();
  return (
    <DetailModal>
      <AgentDetail agent={agent} contract={contract} />
    </DetailModal>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAgentWithContract } from '@/services/lookups';
import { fetchAgents } from '@/services/valorantApi';
import { AgentDetail } from '@/components/AgentDetail';
import { BackLink } from '@/components/ui/BackLink';

// Pré-renderiza uma página por agente no build (SSG), reusando o cache ISR.
export async function generateStaticParams() {
  const agents = await fetchAgents();
  return agents.map((a) => ({ uuid: a.uuid }));
}

export async function generateMetadata({ params }: { params: { uuid: string } }): Promise<Metadata> {
  const { agent } = await getAgentWithContract(params.uuid);
  if (!agent) return { title: 'Agente não encontrado | Valorant Data' };
  return {
    title: `${agent.displayName} | Valorant Data`,
    description: agent.description,
    openGraph: {
      title: `${agent.displayName} — ${agent.role?.displayName ?? 'Agente'}`,
      description: agent.description,
      images: agent.fullPortrait ? [agent.fullPortrait] : [],
    },
  };
}

export default async function AgentePage({ params }: { params: { uuid: string } }) {
  const { agent, contract } = await getAgentWithContract(params.uuid);
  if (!agent) notFound();

  return (
    <div className="max-w-4xl mx-auto">
      <BackLink href="/agentes" label="Agentes" />
      <article className="bg-surface border border-line">
        <AgentDetail agent={agent} contract={contract} />
      </article>
    </div>
  );
}

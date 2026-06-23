import type { Metadata } from 'next';
import { fetchAgents } from '@/services/valorantApi';
import { AgentsView } from '@/components/views/AgentsView';

export const metadata: Metadata = {
  title: 'Agentes | Valorant Data',
  description: 'Todos os agentes do Valorant: função, habilidades e contrato.',
};

export default async function AgentesPage() {
  const agents = await fetchAgents();
  return <AgentsView agents={agents} />;
}

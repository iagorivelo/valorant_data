// Busca os dados da API no servidor (cache ISR de 24h) e entrega prontos para a
// camada interativa. Sem fetch no cliente → sem waterfall e sem tela de loading.

import { DashboardClient } from '@/components/DashboardClient';
import { fetchAgents, fetchWeapons, fetchContracts, fetchMaps, fetchBundles } from '@/services/valorantApi';
import { Contract } from '@/types/valorant';

export default async function ValorantDashboard() {
  const [agents, weapons, contracts, maps, bundles] = await Promise.all([
    fetchAgents(),
    fetchWeapons(),
    fetchContracts(),
    fetchMaps(),
    fetchBundles(),
  ]);

  // Pré-computa o mapa agente → contrato (lookup O(1) no cliente)
  const agentContracts: Record<string, Contract> = {};
  for (const contract of contracts) {
    const relationId = contract.content?.relationId;
    if (relationId) agentContracts[relationId] = contract;
  }

  return (
    <DashboardClient
      agents={agents}
      weapons={weapons}
      maps={maps}
      bundles={bundles}
      agentContracts={agentContracts}
    />
  );
}

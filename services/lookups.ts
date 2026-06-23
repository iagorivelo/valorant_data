// Buscas por item para as páginas de detalhe e os modais interceptados.
// Reusam os fetchers cacheados (ISR), então buscar a lista inteira é barato.

import { fetchAgents, fetchContracts, fetchWeapons, fetchMaps, fetchBundles } from './valorantApi';
import { Agent, Weapon, ValorantMap, Bundle, Contract } from '@/types/valorant';

export async function getAgentWithContract(
  uuid: string
): Promise<{ agent: Agent | null; contract: Contract | undefined }> {
  const [agents, contracts] = await Promise.all([fetchAgents(), fetchContracts()]);
  const agent = agents.find((a) => a.uuid === uuid) ?? null;
  const contract = contracts.find((c) => c.content?.relationId === uuid);
  return { agent, contract };
}

export async function getWeapon(uuid: string): Promise<Weapon | null> {
  return (await fetchWeapons()).find((w) => w.uuid === uuid) ?? null;
}

export async function getMap(uuid: string): Promise<ValorantMap | null> {
  return (await fetchMaps()).find((m) => m.uuid === uuid) ?? null;
}

export async function getBundle(uuid: string): Promise<Bundle | null> {
  return (await fetchBundles()).find((b) => b.uuid === uuid) ?? null;
}

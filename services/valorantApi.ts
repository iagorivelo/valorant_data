// Funções puras de data fetching — sem dependência de React.
// Rodam em Server Components: respostas cacheadas e revalidadas a cada 24h (ISR),
// já que os dados da API só mudam a cada patch do jogo.

import {
  Agent, Weapon, Contract, ValorantMap, Bundle,
  GameMode, CompetitiveTier, CompetitiveTierSet,
} from '@/types/valorant';

const API_BASE = 'https://valorant-api.com/v1';
const LANG = 'language=pt-BR';
const REVALIDATE_SECONDS = 86_400; // 24h

/** GET genérico para a API Valorant, com cache ISR e checagem de erro. */
async function fetchData<T>(endpoint: string, resource: string): Promise<T> {
  const sep = endpoint.includes('?') ? '&' : '?';
  const res = await fetch(`${API_BASE}/${endpoint}${sep}${LANG}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) throw new Error(`Falha ao buscar ${resource}: ${res.status}`);
  const json = await res.json();
  return json.data as T;
}

export const fetchAgents = () =>
  fetchData<Agent[]>('agents?isPlayableCharacter=true', 'agentes');

export const fetchWeapons = () => fetchData<Weapon[]>('weapons', 'armas');

export const fetchContracts = () => fetchData<Contract[]>('contracts', 'contratos');

export async function fetchMaps(): Promise<ValorantMap[]> {
  const maps = await fetchData<ValorantMap[]>('maps', 'mapas');
  // Filtra entradas sem splash (mapas de treino/tutorial sem imagem)
  return maps.filter((m) => m.splash && m.displayName !== 'The Range');
}

export async function fetchBundles(): Promise<Bundle[]> {
  const bundles = await fetchData<Omit<Bundle, 'releaseOrder'>[]>('bundles', 'coleções');
  // Injeta releaseOrder (índice da API = ordem cronológica)
  return bundles
    .filter((b) => b.displayIcon || b.displayIcon2 || b.verticalPromoImage)
    .map((b, i) => ({ ...b, releaseOrder: i }));
}

export async function fetchGameModes(): Promise<GameMode[]> {
  const modes = await fetchData<GameMode[]>('gamemodes', 'modos de jogo');
  // Mantém só modos com nome e descrição (descarta entradas internas)
  return modes.filter((m) => m.displayName?.trim() && m.description?.trim());
}

export async function fetchCompetitiveTiers(): Promise<CompetitiveTier[]> {
  const sets = await fetchData<CompetitiveTierSet[]>('competitivetiers', 'tiers competitivos');
  // Usa o conjunto mais recente; mantém só ranks reais (com ícone e tier > 0,
  // descartando "Sem Ranque" e os níveis não usados)
  const latest = sets[sets.length - 1];
  return (latest?.tiers ?? []).filter((t) => t.largeIcon && t.tier > 0);
}

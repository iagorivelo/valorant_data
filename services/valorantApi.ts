// Funções puras de data fetching — sem dependência de React.
// Rodam em Server Components: respostas cacheadas e revalidadas a cada 24h (ISR),
// já que os dados da API só mudam a cada patch do jogo.

import {
  Agent, Weapon, Contract, ValorantMap, Bundle,
  GameMode, CompetitiveTier, CompetitiveTierSet,
  Spray, Buddy, PlayerCard,
} from '@/types/valorant';

const API_BASE = 'https://valorant-api.com/v1';
const LANG = 'language=pt-BR';
const REVALIDATE_SECONDS = 86_400; // 24h

// ── Cache em memória (processo) ─────────────────────────────────────────────
// O Data Cache de fetch do Next não guarda respostas acima de 2MB — e o payload
// de /weapons passa de 4MB. Sem cache, cada render dinâmico (ex.: o modal de
// arma) rebaixaria tudo de novo. Este cache de processo guarda o JSON já
// parseado por 24h, servindo instantaneamente após a 1ª chamada e cobrindo
// justamente os endpoints grandes que o Data Cache recusa.
type CacheEntry<T> = { data: T; expiresAt: number };
const memoryCache = new Map<string, CacheEntry<unknown>>();
// Deduplica chamadas concorrentes ao mesmo endpoint (evita N downloads em paralelo).
const inFlight = new Map<string, Promise<unknown>>();

/** GET genérico para a API Valorant, com cache em memória + ISR e checagem de erro. */
async function fetchData<T>(endpoint: string, resource: string): Promise<T> {
  const sep = endpoint.includes('?') ? '&' : '?';
  const url = `${API_BASE}/${endpoint}${sep}${LANG}`;
  const now = Date.now();

  const cached = memoryCache.get(url);
  if (cached && cached.expiresAt > now) return cached.data as T;

  const existing = inFlight.get(url);
  if (existing) return existing as Promise<T>;

  const promise = (async () => {
    try {
      const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
      if (!res.ok) throw new Error(`Falha ao buscar ${resource}: ${res.status}`);
      const json = await res.json();
      const data = json.data as T;
      memoryCache.set(url, { data, expiresAt: Date.now() + REVALIDATE_SECONDS * 1000 });
      return data;
    } catch (err) {
      // Loga para observabilidade e repropaga para o error boundary (app/error.tsx).
      console.error(`[valorantApi] erro ao buscar ${resource} (${url}):`, err);
      throw err;
    } finally {
      inFlight.delete(url);
    }
  })();

  inFlight.set(url, promise);
  return promise as Promise<T>;
}

export const fetchAgents = () =>
  fetchData<Agent[]>('agents?isPlayableCharacter=true', 'agentes');

export const fetchWeapons = () => fetchData<Weapon[]>('weapons', 'armas');

/**
 * Busca UMA arma pelo endpoint por-item (~290KB) em vez da lista inteira (~4,6MB,
 * que estoura o Data Cache do Next). Elimina o gargalo do modal/detalhe de arma.
 * Retorna null em 404 (arma inexistente) e repropaga erros reais.
 */
export async function fetchWeapon(uuid: string): Promise<Weapon | null> {
  try {
    return await fetchData<Weapon>(`weapons/${uuid}`, 'arma');
  } catch (err) {
    if (err instanceof Error && err.message.includes(': 404')) return null;
    throw err;
  }
}

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

export async function fetchSprays(): Promise<Spray[]> {
  const sprays = await fetchData<Spray[]>('sprays', 'sprays');
  return sprays.filter((s) => !s.isNullSpray && s.displayName && (s.fullTransparentIcon || s.displayIcon));
}

export async function fetchBuddies(): Promise<Buddy[]> {
  const buddies = await fetchData<Buddy[]>('buddies', 'chaveiros');
  return buddies.filter((b) => b.displayName && b.displayIcon);
}

export async function fetchPlayerCards(): Promise<PlayerCard[]> {
  const cards = await fetchData<PlayerCard[]>('playercards', 'cartões');
  return cards.filter((c) => c.displayName && (c.largeArt || c.displayIcon));
}

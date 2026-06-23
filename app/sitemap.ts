import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/utils/site';
import { fetchAgents, fetchWeapons, fetchMaps, fetchBundles } from '@/services/valorantApi';

// Sitemap gerado no servidor: rotas estáticas (abas) + uma entrada por item com
// página de detalhe (agentes, armas, mapas, coleções). Cosméticos só têm galerias,
// sem rota por item. Os fetchers usam o mesmo cache ISR de 24h das páginas.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const sections = [
    '/agentes',
    '/armas',
    '/mapas',
    '/colecoes',
    '/cosmeticos/sprays',
    '/cosmeticos/chaveiros',
    '/cosmeticos/cartoes',
    '/modos',
    '/ranks',
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const [agents, weapons, maps, bundles] = await Promise.all([
    fetchAgents(),
    fetchWeapons(),
    fetchMaps(),
    fetchBundles(),
  ]);

  const item = (base: string, uuid: string) => ({
    url: `${SITE_URL}${base}/${uuid}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  });

  const details = [
    ...agents.map((a) => item('/agentes', a.uuid)),
    ...weapons.map((w) => item('/armas', w.uuid)),
    ...maps.map((m) => item('/mapas', m.uuid)),
    ...bundles.map((b) => item('/colecoes', b.uuid)),
  ];

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...sections,
    ...details,
  ];
}

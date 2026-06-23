// Classifica coleções em: champions | vct | teams | standard, e extrai o ano.

import { Bundle } from '@/types/valorant';

export type BundleCategory = 'champions' | 'vct' | 'teams' | 'standard';

// Eventos "marquee" oficiais (campeonato mundial e majors)
const CHAMPIONS_PATTERNS = [
  /\bchampions\b/i,
  /masters/i,
  /game changers/i,
  /lock\/\/in/i,
];

// Times/organizações de esports com skin packs próprios (fora do circuito VCT)
const TEAMS_PATTERNS = [
  /\bnrg\b/i, /\bt1\b/i, /\bfnatic\b/i, /\bloud\b/i, /\bdrx\b/i,
  /\bsentinels\b/i, /\bcloud9\b/i, /\bc9\b/i, /\blev\b/i, /\bnavi\b/i,
  /\bna'vi\b/i, /\bxset\b/i, /\boptic\b/i, /\bliquid\b/i, /\bteam liquid\b/i,
  /\b100 thieves\b/i, /\b100t\b/i, /\bfaze\b/i, /\bkru\b/i, /\bguardians\b/i,
  /\bpaper rex\b/i, /\bprx\b/i, /\bledge\b/i, /\bblast\b/i, /\bevil geniuses\b/i,
  /\bgiantx\b/i, /\bkoi\b/i, /\bbotz\b/i, /\bfuria\b/i, /\bmibr\b/i, /\bkarmine\b/i,
];

/** Junta todos os campos textuais relevantes de um bundle. */
function bundleText(bundle: Bundle): string {
  return [
    bundle.displayName,
    bundle.displayNameSubText ?? '',
    bundle.description ?? '',
    bundle.extraDescription ?? '',
    bundle.promoDescription ?? '',
  ].join(' ');
}

export function getBundleCategory(bundle: Bundle): BundleCategory {
  const text = bundleText(bundle);

  if (CHAMPIONS_PATTERNS.some((p) => p.test(text))) return 'champions';
  if (/\bvct\b/i.test(text)) return 'vct';
  if (TEAMS_PATTERNS.some((p) => p.test(text))) return 'teams';
  return 'standard';
}

/**
 * Extrai o ano da coleção a partir do texto. Sinais (em ordem de confiança):
 * ano explícito (ex.: "Champions 2025", "VCT Temporada 2026"), prefixo "VCT25",
 * e por fim "LOCK//IN" (temporada 2023). Retorna null se não houver ano.
 */
export function getBundleYear(bundle: Bundle): number | null {
  const text = bundleText(bundle);

  const explicit = text.match(/\b(20\d\d)\b/);
  if (explicit) return Number(explicit[1]);

  const vct = text.match(/VCT\s?(\d{2})\b/i);
  if (vct) return 2000 + Number(vct[1]);

  if (/lock\/\/in/i.test(text)) return 2023;
  return null;
}

/** Indica se o bundle pertence ao circuito (champions/vct) e bate com o ano. */
export function bundleMatchesYear(bundle: Bundle, year: number): boolean {
  const category = getBundleCategory(bundle);
  if (category !== 'champions' && category !== 'vct') return false;
  return getBundleYear(bundle) === year;
}

/** Anos disponíveis (decrescente) entre as coleções de champions/vct. */
export function listCollectionYears(bundles: Bundle[]): number[] {
  const years = new Set<number>();
  for (const bundle of bundles) {
    const category = getBundleCategory(bundle);
    if (category === 'champions' || category === 'vct') {
      const year = getBundleYear(bundle);
      if (year) years.add(year);
    }
  }
  return Array.from(years).sort((a, b) => b - a);
}

// Estatísticas da arma: custo, atributos principais e tabela de dano por distância.

import { Weapon } from '@/types/valorant';

const PENETRATION: Record<string, string> = {
  Low: 'Baixa',
  Medium: 'Média',
  High: 'Alta',
};

const num = (n: number) => n.toLocaleString('pt-BR');

// "EWallPenetrationDisplayType::Medium" → "Média"
function penetration(raw: string): string {
  const key = raw.includes('::') ? raw.split('::').pop() ?? raw : raw;
  return PENETRATION[key] ?? key;
}

export function WeaponStats({ weapon }: { weapon: Weapon }) {
  const stats = weapon.weaponStats;
  const cost = weapon.shopData?.cost;
  if (!stats && cost == null) return null;

  const cards: { label: string; value: string }[] = [];
  if (cost != null) cards.push({ label: 'Custo', value: num(cost) });
  if (stats) {
    cards.push(
      { label: 'Cadência', value: `${num(stats.fireRate)}/s` },
      { label: 'Pente', value: num(stats.magazineSize) },
      { label: 'Recarga', value: `${num(stats.reloadTimeSeconds)}s` },
      { label: 'Penetração', value: penetration(stats.wallPenetration) }
    );
  }

  const ranges = stats?.damageRanges ?? [];

  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-5">
        <span className="w-1 h-5 bg-accent" aria-hidden="true" />
        <h4 className="font-display text-xl font-semibold uppercase tracking-wide text-ink">
          Estatísticas
        </h4>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-6">
        {cards.map((c) => (
          <div key={c.label} className="bg-ground border border-line p-3 text-center">
            <div className="text-[10px] text-ink-faint uppercase font-semibold tracking-wider mb-1">
              {c.label}
            </div>
            <div className="font-display text-2xl font-semibold text-ink tabular-nums leading-none">
              {c.value}
            </div>
          </div>
        ))}
      </div>

      {ranges.length > 0 && (
        <div>
          <p className="eyebrow mb-2">Dano por distância</p>
          <div className="overflow-x-auto border border-line">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-surface-raised text-ink-faint">
                  <th className="text-left font-semibold uppercase text-[11px] tracking-wider px-4 py-2">Distância</th>
                  <th className="text-right font-semibold uppercase text-[11px] tracking-wider px-4 py-2">Cabeça</th>
                  <th className="text-right font-semibold uppercase text-[11px] tracking-wider px-4 py-2">Corpo</th>
                  <th className="text-right font-semibold uppercase text-[11px] tracking-wider px-4 py-2">Perna</th>
                </tr>
              </thead>
              <tbody className="font-mono tabular-nums">
                {ranges.map((r, i) => (
                  <tr key={i} className="border-t border-line">
                    <td className="px-4 py-2 text-ink-muted">{r.rangeStartMeters}–{r.rangeEndMeters}m</td>
                    <td className="px-4 py-2 text-right text-accent font-semibold">{num(r.headDamage)}</td>
                    <td className="px-4 py-2 text-right text-ink">{num(r.bodyDamage)}</td>
                    <td className="px-4 py-2 text-right text-ink-muted">{num(r.legDamage)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

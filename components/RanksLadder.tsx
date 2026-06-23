// Escada de ranks competitivos, agrupada por divisão (Ferro → Radiante).

import { CompetitiveTier } from '@/types/valorant';
import { Img } from '@/components/ui/Img';

interface Division {
  name: string;
  color: string;
  tiers: CompetitiveTier[];
}

function groupByDivision(tiers: CompetitiveTier[]): Division[] {
  const divisions: Division[] = [];
  for (const tier of tiers) {
    let division = divisions[divisions.length - 1];
    if (!division || division.name !== tier.divisionName) {
      division = { name: tier.divisionName, color: tier.color, tiers: [] };
      divisions.push(division);
    }
    division.tiers.push(tier);
  }
  return divisions;
}

export function RanksLadder({ tiers }: { tiers: CompetitiveTier[] }) {
  const divisions = groupByDivision(tiers);

  return (
    <div className="space-y-8">
      {divisions.map((division) => {
        const accent = `#${division.color.slice(0, 6)}`;
        return (
          <div key={division.name}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1 h-4" style={{ backgroundColor: accent }} aria-hidden="true" />
              <h3 className="font-display text-base font-semibold uppercase tracking-[0.12em]" style={{ color: accent }}>
                {division.name}
              </h3>
              <span className="flex-1 h-px bg-line" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {division.tiers.map((tier) => (
                <div
                  key={tier.tier}
                  className="bg-surface border border-line flex flex-col items-center gap-2 p-4 hover:border-ink-faint transition-colors"
                >
                  {tier.largeIcon && (
                    <Img src={tier.largeIcon} alt={tier.tierName} width={64} height={64} className="w-16 h-16 object-contain" />
                  )}
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted text-center">
                    {tier.tierName}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

'use client';

// Exibe coleções separadas em 3 seções: Champions, Times e Pacotes

import { useMemo } from 'react';
import { Trophy, Sparkles, Shield, Package } from 'lucide-react';
import { Bundle } from '@/types/valorant';
import { BundleCard } from '@/components/BundleCard';
import { getBundleCategory, BundleCategory } from '@/utils/bundleClassifier';

interface CollectionsGridProps {
  bundles: Bundle[];
  onSelect: (bundle: Bundle) => void;
}

interface Section {
  key:   BundleCategory;
  label: string;
  icon:  React.ReactNode;
  accent: string;
}

const SECTIONS: Section[] = [
  {
    key:    'champions',
    label:  'Champions',
    icon:   <Trophy size={15} />,
    accent: 'text-amber-400',
  },
  {
    key:    'vct',
    label:  'Cápsulas VCT',
    icon:   <Sparkles size={15} />,
    accent: 'text-accent',
  },
  {
    key:    'teams',
    label:  'Times de Esports',
    icon:   <Shield size={15} />,
    accent: 'text-sky-400',
  },
  {
    key:    'standard',
    label:  'Pacotes de Coleção',
    icon:   <Package size={15} />,
    accent: 'text-ink-muted',
  },
];

export function CollectionsGrid({ bundles, onSelect }: CollectionsGridProps) {
  // Classifica cada bundle uma única vez por render (antes: 3× por bundle).
  const grouped = useMemo(() => {
    const acc: Record<BundleCategory, Bundle[]> = { champions: [], vct: [], teams: [], standard: [] };
    for (const bundle of bundles) acc[getBundleCategory(bundle)].push(bundle);
    return acc;
  }, [bundles]);

  // Se todos estão numa categoria só (busca filtrou) exibe flat sem seções
  const nonEmpty = SECTIONS.filter((s) => grouped[s.key].length > 0);
  if (nonEmpty.length === 1) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {bundles.map((b) => (
          <BundleCard key={b.uuid} bundle={b} onClick={onSelect} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {SECTIONS.map((section) => {
        const items = grouped[section.key];
        if (items.length === 0) return null;

        return (
          <div key={section.key}>
            <div className="flex items-center gap-3 mb-5">
              <span className={section.accent}>{section.icon}</span>
              <h2 className="font-display text-lg font-semibold uppercase tracking-[0.12em] text-ink">
                {section.label}
              </h2>
              <span className={`font-mono text-xs tabular-nums ${section.accent}`}>
                {items.length.toString().padStart(2, '0')}
              </span>
              <span className="flex-1 h-px bg-line" aria-hidden="true" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((bundle) => (
                <BundleCard key={bundle.uuid} bundle={bundle} onClick={onSelect} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

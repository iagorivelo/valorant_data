'use client';

// Sub-navegação da seção de cosméticos (Sprays / Chaveiros / Cartões).

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SUBTABS = [
  { href: '/cosmeticos/sprays',    label: 'Sprays' },
  { href: '/cosmeticos/chaveiros', label: 'Chaveiros' },
  { href: '/cosmeticos/cartoes',   label: 'Cartões' },
];

export function CosmeticsNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {SUBTABS.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wide border transition-colors ${
              active
                ? 'border-accent text-accent bg-accent/10'
                : 'border-line text-ink-muted hover:text-ink hover:border-ink-faint'
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}

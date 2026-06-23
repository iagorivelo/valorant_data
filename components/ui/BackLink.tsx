// Link de "voltar" exibido no topo das páginas de detalhe (acesso direto).

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 mb-5 text-sm font-semibold uppercase tracking-wide text-ink-muted hover:text-accent transition-colors"
    >
      <ArrowLeft size={16} />
      {label}
    </Link>
  );
}

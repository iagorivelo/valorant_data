'use client';

// Aba de agentes: busca + grade. Clicar navega para /agentes/[uuid]
// (que abre como modal interceptado ou página cheia no acesso direto).

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { AgentCard } from '@/components/AgentCard';
import { SearchInput } from '@/components/SearchInput';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FilterChips } from '@/components/ui/FilterChips';
import { normalize, matchesQuery } from '@/utils/text';
import { Agent } from '@/types/valorant';

export function AgentsView({ agents }: { agents: Agent[] }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [role, setRole] = useState<string | null>(null);

  const roles = useMemo(() => {
    const names = new Set<string>();
    for (const a of agents) if (a.role?.displayName) names.add(a.role.displayName);
    return Array.from(names).sort((x, y) => x.localeCompare(y, 'pt'));
  }, [agents]);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return agents.filter(
      (a) =>
        matchesQuery(q, a.displayName, a.role?.displayName) &&
        (role === null || a.role?.displayName === role)
    );
  }, [agents, query, role]);

  return (
    <section className="animate-fade-up">
      <SectionHeader title="Agentes" count={agents.length} />
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Buscar agente por nome ou função…"
        resultCount={filtered.length}
        totalCount={agents.length}
      />
      <div className="-mt-2 mb-6">
        <FilterChips
          label="Função"
          options={roles.map((r) => ({ value: r, label: r }))}
          value={role}
          onChange={setRole}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((agent) => (
          <AgentCard key={agent.uuid} agent={agent} onClick={(a) => router.push(`/agentes/${a.uuid}`)} />
        ))}
      </div>
    </section>
  );
}

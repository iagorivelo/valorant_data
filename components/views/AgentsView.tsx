'use client';

// Aba de agentes: busca + grade. Clicar navega para /agentes/[uuid]
// (que abre como modal interceptado ou página cheia no acesso direto).

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { AgentCard } from '@/components/AgentCard';
import { SearchInput } from '@/components/SearchInput';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { normalize, matchesQuery } from '@/utils/text';
import { Agent } from '@/types/valorant';

export function AgentsView({ agents }: { agents: Agent[] }) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return q ? agents.filter((a) => matchesQuery(q, a.displayName, a.role?.displayName)) : agents;
  }, [agents, query]);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((agent) => (
          <AgentCard key={agent.uuid} agent={agent} onClick={(a) => router.push(`/agentes/${a.uuid}`)} />
        ))}
      </div>
    </section>
  );
}

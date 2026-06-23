'use client';

import { Agent } from '@/types/valorant';
import { CardButton } from '@/components/ui/CardButton';
import { Img } from '@/components/ui/Img';

interface AgentCardProps {
  agent: Agent;
  onClick: (agent: Agent) => void;
}

export function AgentCard({ agent, onClick }: AgentCardProps) {
  return (
    <CardButton
      onClick={() => onClick(agent)}
      ariaLabel={`Ver detalhes de ${agent.displayName}`}
      className="group overflow-hidden"
    >
      {/* Retrato/cena de fundo, esmaecida */}
      {agent.background && (
        <div className="absolute inset-0 opacity-[0.12] group-hover:opacity-20 transition-opacity duration-500">
          <Img
            src={agent.background}
            alt=""
            aria-hidden="true"
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
          />
        </div>
      )}

      <div className="relative z-10 p-6">
        <Img
          src={agent.displayIcon}
          alt={`Ícone de ${agent.displayName}`}
          className="w-20 h-20 mb-5 transition-transform duration-500 group-hover:-translate-y-0.5"
        />
        {agent.role && (
          <div className="flex items-center gap-1.5 mb-2">
            {agent.role.displayIcon && (
              <Img src={agent.role.displayIcon} alt="" aria-hidden="true" className="w-3.5 h-3.5" />
            )}
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">
              {agent.role.displayName}
            </span>
          </div>
        )}
        <h3 className="font-display text-2xl font-semibold uppercase tracking-wide text-ink mb-2 leading-none">
          {agent.displayName}
        </h3>
        <p className="text-ink-muted text-sm leading-relaxed line-clamp-3">{agent.description}</p>
      </div>
    </CardButton>
  );
}

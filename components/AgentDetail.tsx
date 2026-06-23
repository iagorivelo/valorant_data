'use client';

import { Agent, Contract, AgentAbility } from '@/types/valorant';
import { Img } from '@/components/ui/Img';

interface AgentDetailProps {
  agent: Agent;
  contract: Contract | undefined;
}

const ABILITY_KIND: Partial<Record<AgentAbility['slot'], string>> = {
  Ultimate: 'Suprema',
  Passive: 'Passiva',
};

export function AgentDetail({ agent, contract }: AgentDetailProps) {
  const contractLevels = contract?.chapters[0]?.levels ?? [];
  const abilities = agent.abilities.filter((a) => a.displayName);

  return (
    <div className="p-8 md:p-10">
      {/* Hero: retrato + info */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center mb-10">
        <Img
          src={agent.fullPortrait}
          alt={agent.displayName}
          className="w-52 md:w-64 drop-shadow-[0_0_40px_rgba(255,70,85,0.25)] flex-shrink-0"
        />
        <div>
          <div className="flex items-center gap-2 mb-3">
            {agent.role?.displayIcon && (
              <Img src={agent.role.displayIcon} alt="" aria-hidden="true" className="w-4 h-4" />
            )}
            <p className="eyebrow text-accent">{agent.role?.displayName ?? 'Agente'}</p>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold uppercase tracking-wide text-ink leading-[0.9] mb-5">
            {agent.displayName}
          </h2>
          <p className="text-base md:text-lg text-ink-muted leading-relaxed max-w-prose">
            {agent.description}
          </p>
        </div>
      </div>

      {/* Habilidades */}
      {abilities.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-1 h-5 bg-accent" aria-hidden="true" />
            <h4 className="font-display text-xl font-semibold uppercase tracking-wide text-ink">
              Habilidades
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {abilities.map((ability, idx) => {
              const isUltimate = ability.slot === 'Ultimate';
              return (
                <div
                  key={`${ability.slot}-${idx}`}
                  className={`flex gap-4 p-4 border bg-ground ${
                    isUltimate ? 'border-accent/40' : 'border-line'
                  }`}
                >
                  <div className="w-11 h-11 flex-shrink-0 grid place-items-center border border-line bg-surface">
                    {ability.displayIcon ? (
                      <Img src={ability.displayIcon} alt={ability.displayName} className="w-7 h-7 object-contain" />
                    ) : (
                      <span className="font-display text-ink-faint text-lg">{idx + 1}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h5 className="font-semibold text-ink text-sm uppercase tracking-wide truncate">
                        {ability.displayName}
                      </h5>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 flex-shrink-0 ${
                          isUltimate ? 'bg-accent/15 text-accent' : 'bg-surface-raised text-ink-faint'
                        }`}
                      >
                        {ABILITY_KIND[ability.slot] ?? 'Habilidade'}
                      </span>
                    </div>
                    <p className="text-ink-muted text-[13px] leading-relaxed mt-1">
                      {ability.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Contrato do agente */}
      {contractLevels.length > 0 && (
        <>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-1 h-5 bg-accent" aria-hidden="true" />
            <h4 className="font-display text-xl font-semibold uppercase tracking-wide text-ink">
              Contrato do Agente
            </h4>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {contractLevels.map((level, idx) => (
              <div
                key={idx}
                className="bg-ground p-3 text-center border border-line hover:border-accent/50 transition-colors"
              >
                <div className="text-[10px] text-ink-faint mb-1 uppercase font-semibold tracking-wider">
                  Nível {idx + 1}
                </div>
                <div className="h-10 flex items-center justify-center">
                  <span className="text-[10px] text-ink-muted uppercase font-medium">
                    {level.reward?.type ?? 'Recompensa'}
                  </span>
                </div>
                {level.xp > 0 && (
                  <div className="text-[9px] text-accent/70 mt-1 font-mono tabular-nums">
                    {level.xp.toLocaleString('pt-BR')} XP
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

'use client';

// Superfície clicável e acessível compartilhada por todos os cards do dashboard.
// Aplica o estilo `.card` (elevação + sombra + escala sutil no hover/foco) e a
// entrada suave na rolagem (useReveal), além de concentrar o padrão
// role/tabIndex/teclado, com suporte a Enter e Espaço.

import type { CSSProperties, ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

interface CardButtonProps {
  onClick: () => void;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
  /** Posição na grade — alimenta o stagger da animação de entrada. */
  index?: number;
  children: ReactNode;
}

export function CardButton({ onClick, className = '', style, ariaLabel, index = 0, children }: CardButtonProps) {
  const reveal = useReveal<HTMLDivElement>(index);

  return (
    <div
      ref={reveal.ref}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      onAnimationEnd={reveal.onAnimationEnd}
      style={{ ...reveal.style, ...style }}
      className={`card ${reveal.className} ${className}`}
    >
      {children}
    </div>
  );
}

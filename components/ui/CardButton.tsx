// Superfície clicável e acessível compartilhada por todos os cards do dashboard.
// Aplica o estilo `.card` (hairline + colchete de mira no hover/foco) e concentra
// o padrão role/tabIndex/teclado, com suporte a Enter e Espaço.

import type { CSSProperties, ReactNode } from 'react';

interface CardButtonProps {
  onClick: () => void;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
  children: ReactNode;
}

export function CardButton({ onClick, className = '', style, ariaLabel, children }: CardButtonProps) {
  return (
    <div
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
      style={style}
      className={`card ${className}`}
    >
      {children}
    </div>
  );
}

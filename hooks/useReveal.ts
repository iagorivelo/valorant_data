'use client';

// Entrada suave (fade + slide) disparada quando o elemento entra na viewport.
//
// Usa uma ANIMAÇÃO CSS (não transition) para não colidir com a transição de
// transform do hover no mesmo elemento. Máquina de 3 estados:
//   'pre'  → invisível, aguardando entrar na tela (só com JS)
//   'in'   → animando a entrada (com atraso de stagger via animationDelay)
//   'done' → animação concluída; classes removidas, hover livre e ágil
// Revela uma única vez e respeita prefers-reduced-motion.
//
// O stagger deriva do índice do item na grade, com teto para não atrasar
// demais os cards mais abaixo (grupos de 6 → 0…300ms).

import { useEffect, useRef, useState, type AnimationEvent } from 'react';

const STAGGER_STEP = 60; // ms entre itens
const STAGGER_GROUP = 6; // reinicia o atraso a cada N itens

type RevealState = 'pre' | 'in' | 'done';

export function useReveal<T extends HTMLElement = HTMLDivElement>(index = 0) {
  const ref = useRef<T>(null);
  const [state, setState] = useState<RevealState>('pre');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Movimento reduzido: aparece imediatamente, sem observar nem animar.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setState('done');
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('in');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const delay = (index % STAGGER_GROUP) * STAGGER_STEP;

  return {
    ref,
    className: state === 'pre' ? 'reveal-pre' : state === 'in' ? 'reveal-in' : '',
    style: state === 'in' ? ({ animationDelay: `${delay}ms` } as const) : undefined,
    onAnimationEnd:
      state === 'in'
        ? (e: AnimationEvent<T>) => {
            // Ignora animationend borbulhando de filhos; só a entrada nos interessa.
            if (e.animationName === 'reveal-enter') setState('done');
          }
        : undefined,
  };
}

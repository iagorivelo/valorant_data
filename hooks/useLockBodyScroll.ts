'use client';

// Trava o scroll do <body> enquanto `locked` for true (ex.: modal aberto).
// Ao esconder o overflow, a barra de rolagem vertical some e o conteúdo
// centralizado deslocaria ~15px para o lado; compensamos com padding-right
// igual à largura da barra, mantendo a página estável (sem "pulo").

import { useEffect } from 'react';

export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const { body } = document;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = body.style.overflow;
    const originalPaddingRight = body.style.paddingRight;

    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = originalOverflow;
      body.style.paddingRight = originalPaddingRight;
    };
  }, [locked]);
}

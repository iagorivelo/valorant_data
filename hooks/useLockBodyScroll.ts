'use client';

// Trava o scroll do <body> enquanto `locked` for true (ex.: modal aberto),
// restaurando o valor original ao desmontar/destravar.

import { useEffect } from 'react';

export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [locked]);
}

'use client';

// Dispara um callback quando Escape é pressionado, enquanto `active` for true.
// Compartilhado por Modal e VideoModal.

import { useEffect } from 'react';

export function useEscapeKey(onEscape: () => void, active = true) {
  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onEscape();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onEscape, active]);
}

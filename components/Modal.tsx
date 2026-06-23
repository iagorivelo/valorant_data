'use client';

import { X } from 'lucide-react';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  useEscapeKey(onClose, isOpen);
  useLockBodyScroll(isOpen);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ground/85 backdrop-blur-md animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-surface border border-line shadow-panel animate-modal-in">
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-4 right-4 z-50 grid place-items-center w-9 h-9 text-ink-muted hover:text-ink bg-ground/70 border border-line hover:border-accent/50 backdrop-blur-sm transition-colors"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
}

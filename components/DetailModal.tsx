'use client';

// Envolve o conteúdo de detalhe no Modal quando aberto via navegação interna
// (rota interceptada). Fechar = voltar na história, restaurando a grade.

import { useRouter } from 'next/navigation';
import { Modal } from '@/components/Modal';

export function DetailModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <Modal isOpen onClose={() => router.back()}>
      {children}
    </Modal>
  );
}

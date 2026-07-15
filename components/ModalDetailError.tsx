// Estado de erro exibido DENTRO do modal quando a busca de detalhes falha.
// Mantém o erro contido no modal (em vez de derrubar a página inteira no
// error boundary global); fechar e reabrir tenta de novo.

import { AlertTriangle } from 'lucide-react';

export function ModalDetailError() {
  return (
    <div className="grid place-items-center gap-4 px-8 py-24 text-center">
      <AlertTriangle size={36} className="text-accent" aria-hidden="true" />
      <p className="text-ink-muted text-sm max-w-xs leading-relaxed">
        Não foi possível carregar estes detalhes. Feche e tente novamente.
      </p>
    </div>
  );
}

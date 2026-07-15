// Fallback de página inteira (loading.tsx) das rotas de detalhe acessadas
// diretamente. Espelha o shell da página — link de voltar + painel — para que
// o layout não "pule" quando o conteúdo real chegar.

import { Spinner } from '@/components/ui/Spinner';

export function DetailPageFallback() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="h-4 w-28 mb-5 bg-line" aria-hidden="true" />
      <div className="bg-surface border border-line grid place-items-center py-32">
        <Spinner label="Carregando" />
      </div>
    </div>
  );
}

// Fallback exibido dentro do modal enquanto o conteúdo de detalhe carrega.
// O shell do modal (DetailModal) fica montado por fora do Suspense, então só
// esta área troca por conteúdo real — sem re-abrir nem re-animar o modal.

import { Spinner } from '@/components/ui/Spinner';

export function ModalDetailFallback() {
  return (
    <div className="grid place-items-center px-8 py-28">
      <Spinner label="Carregando" />
    </div>
  );
}

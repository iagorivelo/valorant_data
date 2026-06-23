// Wrapper único sobre next/image para as imagens remotas da API Valorant.
// Use `fill` (com o pai posicionado e `sizes`) para imagens que preenchem um
// container, ou `width`/`height` para ícones de tamanho fixo.

import Image, { type ImageProps } from 'next/image';

export function Img(props: ImageProps) {
  return <Image {...props} />;
}

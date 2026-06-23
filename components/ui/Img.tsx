// Wrapper único sobre <img> das imagens remotas da API Valorant.
// Centraliza lazy-loading + decoding assíncrono e o eslint-disable em UM lugar,
// em vez de repeti-los em cada card/detalhe do projeto.

import type { ImgHTMLAttributes } from 'react';

type ImgProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
};

export function Img({ loading = 'lazy', decoding = 'async', alt, ...props }: ImgProps) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt} loading={loading} decoding={decoding} {...props} />;
}

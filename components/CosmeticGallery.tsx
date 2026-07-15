'use client';

// Galeria de cosméticos reutilizável (sprays, chaveiros, cartões). Como são
// centenas de itens, faz busca + renderização incremental (scroll infinito).

import { useState, useMemo, useEffect, useRef } from 'react';
import { SearchInput } from '@/components/SearchInput';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Img } from '@/components/ui/Img';
import { useReveal } from '@/hooks/useReveal';
import { normalize, matchesQuery } from '@/utils/text';

export interface GalleryItem {
  uuid: string;
  displayName: string;
  image: string | null;
}

function CosmeticTile({
  item,
  index,
  isCard,
  sizes,
}: {
  item: GalleryItem;
  index: number;
  isCard: boolean;
  sizes: string;
}) {
  const reveal = useReveal<HTMLDivElement>(index);
  return (
    <div
      ref={reveal.ref}
      onAnimationEnd={reveal.onAnimationEnd}
      style={reveal.style}
      className={`tile group overflow-hidden ${reveal.className}`}
    >
      <div className={`relative w-full overflow-hidden ${isCard ? 'aspect-[3/4]' : 'aspect-square'}`}>
        {item.image && (
          <Img
            src={item.image}
            alt={item.displayName}
            fill
            sizes={sizes}
            className={`transition-transform duration-500 group-hover:scale-105 ${
              isCard ? 'object-cover object-top' : 'object-contain p-3'
            }`}
          />
        )}
      </div>
      <p className="text-caption text-ink-muted text-center leading-tight line-clamp-2 px-2 py-2 border-t border-line">
        {item.displayName}
      </p>
    </div>
  );
}

interface CosmeticGalleryProps {
  title: string;
  items: GalleryItem[];
  searchPlaceholder: string;
  /** 'icon' = ícone quadrado contido; 'card' = arte vertical preenchida. */
  variant: 'icon' | 'card';
}

const PAGE = 48;

export function CosmeticGallery({ title, items, searchPlaceholder, variant }: CosmeticGalleryProps) {
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(PAGE);
  const sentinel = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return q ? items.filter((i) => matchesQuery(q, i.displayName)) : items;
  }, [items, query]);

  useEffect(() => setVisible(PAGE), [query]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  useEffect(() => {
    if (!hasMore) return;
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && setVisible((v) => v + PAGE),
      { rootMargin: '800px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, shown.length]);

  const isCard = variant === 'card';
  const grid = isCard
    ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5'
    : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4';
  const sizes = isCard
    ? '(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw'
    : '(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw';

  return (
    <section className="animate-fade-up">
      <SectionHeader title={title} count={items.length} />
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder={searchPlaceholder}
        resultCount={filtered.length}
        totalCount={items.length}
      />

      <div className={grid}>
        {shown.map((item, i) => (
          <CosmeticTile key={item.uuid} item={item} index={i} isCard={isCard} sizes={sizes} />
        ))}
      </div>

      {hasMore && (
        <div ref={sentinel} className="flex justify-center mt-8">
          <button
            onClick={() => setVisible((v) => v + PAGE)}
            className="px-6 py-2.5 border border-line text-ink-muted hover:text-ink hover:border-ink-faint text-xs font-semibold uppercase tracking-wide transition-colors"
          >
            Carregar mais ({filtered.length - visible})
          </button>
        </div>
      )}
    </section>
  );
}

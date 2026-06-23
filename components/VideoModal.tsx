'use client';

// Modal dedicado para reprodução do vídeo de um nível de skin

import { useEffect, useRef } from 'react';
import { X, Volume2 } from 'lucide-react';
import { SkinLevel } from '@/types/valorant';
import { useEscapeKey } from '@/hooks/useEscapeKey';

interface VideoModalProps {
  level: SkinLevel | null;
  skinName: string;
  levelIndex: number;
  onClose: () => void;
}

/** Converte o enum da API em rótulo legível em PT-BR */
function parseLevelItem(levelItem: string | null): string {
  if (!levelItem) return 'Animação Base';
  const map: Record<string, string> = {
    VFX: 'Efeitos Visuais (VFX)',
    Finisher: 'Finalização',
    Transformation: 'Transformação',
    SoundEffects: 'Efeitos Sonoros',
    Inspect: 'Inspeção',
    KillBanner: 'Banner de Abate',
    KillCounter: 'Contador de Abates',
    TopFrag: 'Top Frag',
    Animation: 'Animação',
    AttachmentVFX: 'VFX de Acessório',
    HeartbeatAndMapSensor: 'Sensor de Mapa',
  };

  // Extrai a parte após "::" do enum, ex: "EEquippableSkinLevelItem::VFX" → "VFX"
  const key = levelItem.includes('::')
    ? levelItem.split('::').pop() ?? levelItem
    : levelItem;

  return map[key] ?? key;
}

export function VideoModal({ level, skinName, levelIndex, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEscapeKey(onClose);

  // Pausa vídeo ao fechar
  useEffect(() => {
    if (!level && videoRef.current) {
      videoRef.current.pause();
    }
  }, [level]);

  if (!level?.streamedVideo) return null;

  const effectLabel = parseLevelItem(level.levelItem);
  const videoTitle = level.displayName?.trim()
    ? level.displayName
    : `${skinName} — Nível ${levelIndex + 1}`;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-ground/95 backdrop-blur-md animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-2xl bg-surface border border-line shadow-panel overflow-hidden animate-modal-in">

        <div className="flex items-start justify-between p-5 border-b border-line">
          <div className="pr-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-1.5">
              Nível {levelIndex + 1}
            </p>
            <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-ink leading-tight">
              {videoTitle}
            </h3>
            <div className="flex items-center gap-1.5 mt-2">
              <Volume2 size={11} className="text-ink-faint" />
              <span className="text-xs text-ink-muted font-medium">{effectLabel}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar vídeo"
            className="grid place-items-center w-9 h-9 text-ink-muted hover:text-ink border border-line hover:border-accent/50 transition-colors flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        <div className="bg-black aspect-video relative">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            ref={videoRef}
            key={level.streamedVideo} /* força remount ao trocar de level */
            src={level.streamedVideo}
            autoPlay
            loop
            controls
            playsInline
            className="w-full h-full object-contain"
          />
        </div>

        {level.levelItem && (
          <div className="px-5 py-3 bg-surface-raised/50 border-t border-line">
            <p className="text-[10px] text-ink-faint uppercase tracking-wider">
              Tipo de efeito:{' '}
              <span className="text-ink-muted font-semibold">{effectLabel}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

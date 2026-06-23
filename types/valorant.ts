// Interfaces de domínio para os dados da API Valorant

export interface Agent {
  uuid: string;
  displayName: string;
  description: string;
  displayIcon: string;
  fullPortrait: string;
  background: string;
  isPlayableCharacter: boolean;
}

export interface SkinChroma {
  uuid: string;
  displayName: string;
  displayIcon: string | null;
  fullRender: string | null;
  swatch: string | null;
}

export interface SkinLevel {
  uuid: string;
  displayName: string;
  levelItem: string | null;
  displayIcon: string | null;
  streamedVideo: string | null;
}

export interface WeaponSkin {
  uuid: string;
  displayName: string;
  displayIcon: string | null;
  chromas: SkinChroma[];
  levels: SkinLevel[];
}

export interface Weapon {
  uuid: string;
  displayName: string;
  displayIcon: string;
  shopData: {
    categoryText: string;
  } | null;
  skins: WeaponSkin[];
}

export interface ContractLevel {
  reward: {
    type: string;
    uuid: string;
    amount: number;
  };
  xp: number;
  doughCost: number;
  isPurchasableWithDough: boolean;
}

export interface ContractChapter {
  levels: ContractLevel[];
  freeRewards: unknown[];
}

export interface Contract {
  uuid: string;
  displayName: string;
  content?: {
    relationId: string;
    relationType: string;
  };
  chapters: ContractChapter[];
}

export interface ValorantMap {
  uuid: string;
  displayName: string;
  narrativeDescription: string | null;
  tacticalDescription: string | null;
  coordinates: string | null;
  displayIcon: string | null;
  listViewIcon: string | null;
  splash: string;
  stylizedBackgroundImage: string | null;
  xMultiplier: number;
  yMultiplier: number;
  xScalarToAdd: number;
  yScalarToAdd: number;
}

export interface Bundle {
  uuid: string;
  displayName: string;
  displayNameSubText: string | null;
  description: string | null;
  extraDescription: string | null;
  promoDescription: string | null;
  displayIcon: string | null;
  displayIcon2: string | null;
  verticalPromoImage: string | null;
  /** Índice original da API — proxy da ordem cronológica de lançamento */
  releaseOrder: number;
}

export type Tab = 'agents' | 'weapons' | 'maps' | 'collections';

export type CollectionSort     = 'newest' | 'oldest' | 'az' | 'za';
export type CollectionCategory = 'all' | 'standard' | 'champions';

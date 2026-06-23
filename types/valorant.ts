// Interfaces de domínio para os dados da API Valorant

export interface AgentRole {
  uuid: string;
  displayName: string;
  description: string;
  displayIcon: string;
}

export interface AgentAbility {
  slot: 'Ability1' | 'Ability2' | 'Grenade' | 'Ultimate' | 'Passive';
  displayName: string;
  description: string;
  displayIcon: string | null;
}

export interface Agent {
  uuid: string;
  displayName: string;
  description: string;
  displayIcon: string;
  fullPortrait: string;
  background: string;
  isPlayableCharacter: boolean;
  role: AgentRole | null;
  abilities: AgentAbility[];
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

export interface DamageRange {
  rangeStartMeters: number;
  rangeEndMeters: number;
  headDamage: number;
  bodyDamage: number;
  legDamage: number;
}

export interface WeaponStats {
  fireRate: number;
  magazineSize: number;
  runSpeedMultiplier: number;
  equipTimeSeconds: number;
  reloadTimeSeconds: number;
  firstBulletAccuracy: number;
  shotgunPelletCount: number;
  wallPenetration: string;
  fireMode: string | null;
  damageRanges: DamageRange[];
}

export interface Weapon {
  uuid: string;
  displayName: string;
  displayIcon: string;
  shopData: {
    cost: number;
    categoryText: string;
  } | null;
  weaponStats: WeaponStats | null;
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

export interface GameMode {
  uuid: string;
  displayName: string;
  description: string | null;
  duration: string | null;
  displayIcon: string | null;
  listViewIconTall: string | null;
}

export interface CompetitiveTier {
  tier: number;
  tierName: string;
  divisionName: string;
  color: string;
  backgroundColor: string;
  largeIcon: string | null;
  smallIcon: string | null;
}

export interface CompetitiveTierSet {
  uuid: string;
  tiers: CompetitiveTier[];
}

export interface Spray {
  uuid: string;
  displayName: string;
  isNullSpray: boolean;
  displayIcon: string | null;
  fullTransparentIcon: string | null;
  animationGif: string | null;
}

export interface Buddy {
  uuid: string;
  displayName: string;
  displayIcon: string | null;
}

export interface PlayerCard {
  uuid: string;
  displayName: string;
  displayIcon: string | null;
  largeArt: string | null;
  wideArt: string | null;
}

export type Tab = 'agents' | 'weapons' | 'maps' | 'collections' | 'modes' | 'ranks';

export type CollectionSort     = 'newest' | 'oldest' | 'az' | 'za';
export type CollectionCategory = 'all' | 'standard' | 'champions';

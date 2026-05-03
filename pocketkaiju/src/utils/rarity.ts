import type { EggTier, Rarity } from '../types';
export const rarityColors: Record<Rarity,string>={common:'#9ca3af',rare:'#3b82f6',epic:'#a855f7',mythic:'#fbbf24'};
export const eggDurations: Record<EggTier,number>={common:30_000,rare:120_000,epic:300_000,mythic:600_000}; // prod: 4h/8h/12h/24h
const tables={common:[['common',0.6],['rare',0.3],['epic',0.08],['mythic',0.02]],rare:[['common',0.3],['rare',0.5],['epic',0.18],['mythic',0.02]],epic:[['common',0.1],['rare',0.3],['epic',0.5],['mythic',0.1]],mythic:[['rare',0.1],['epic',0.4],['mythic',0.5]]} as const;
export const rollPartRarity=(tier:EggTier):Rarity=>{let r=Math.random(); for(const [k,p] of tables[tier]){r-=p;if(r<=0) return k as Rarity;} return 'common';};

export type Rarity = 'common'|'rare'|'epic'|'mythic';
export type PartCategory='head'|'torso'|'arms'|'legs'|'aura';
export type EggTier=Rarity;
export type Action='attack'|'charge'|'defend'|'special';
export interface Stats { hp:number; atk:number; def:number; rageGen:number }
export interface Part { id:string; name:string; category:PartCategory; rarity:Rarity; stats:Stats; description:string; visualKey:string; color:string }
export interface Egg { id:string; tier:EggTier; readyAt:number; opened:boolean }
export interface Enemy { id:string; name:string; tier:Rarity; maxHp:number; drop:EggTier; bonus?:Partial<Record<Rarity,number>>; script:Action[] }

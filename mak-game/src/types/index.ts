export type Rarity = 'common' | 'rare' | 'epic' | 'mythic';
export type Screen = 'splash' | 'home' | 'levels' | 'prep' | 'combat' | 'victory' | 'defeat' | 'incubator' | 'deck' | 'collection';

export type Kaiju = {id:string; name:string; rarity:Rarity; hp:number; dmg:number; cooldown:number; range:number; dnaCost:number; emoji:string; accent:string; description:string; behavior:'single'|'dot'|'summon'|'stun'};
export type EnemyType = {id:string; name:string; hp:number; speed:number; coreDamage:number; emoji:string; color:string; special?:'ranged'|'explode'};
export type WaveEnemy = {enemyId:string; delay:number};
export type Level = {id:number; name:string; slotCount:number; duration:number; eggTier:Rarity; waves:WaveEnemy[][]};
export type Egg = {id:string; tier:Rarity; readyAt:number};
export type OwnedKaiju = Record<string, {unlocked:boolean; dna:number}>;

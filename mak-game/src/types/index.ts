export type Rarity = 'common' | 'rare' | 'epic' | 'mythic';
export type Screen = 'splash'|'home'|'levelSelect'|'prep'|'combat'|'victory'|'defeat'|'incubator'|'collection'|'deck';
export type Kaiju = { id:string; name:string; rarity:Rarity; hp:number; dmg:number; cooldown:number; range:number; dnaCost:number; emoji:string; accent:string; behavior:'single'|'dot'|'spawn'|'stun' };
export type EnemyType = { id:string; name:string; hp:number; speed:number; coreDamage:number; emoji:string; color:string };
export type WaveEnemy={typeId:string; delay:number};
export type Level={id:number; name:string; slots:number; duration:number; eggReward:Rarity; waves:WaveEnemy[][]};
export type Egg={id:string; rarity:Rarity; readyAt:number};

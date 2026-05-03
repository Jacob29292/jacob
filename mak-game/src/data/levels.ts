import type { Level } from '../types';
const w=(enemyId:string,count:number,start=0,step=2000)=>Array.from({length:count},(_,i)=>({enemyId,delay:start+i*step}));
export const levels: Level[] = [
{id:1,name:'Laboratoire Brisé',slotCount:1,duration:30,eggTier:'common',waves:[w('sprinter',3)]},
{id:2,name:'Couloir Biohazard',slotCount:2,duration:45,eggTier:'common',waves:[[...w('sprinter',3),...w('spitter',2,3500,2300)]]},
{id:3,name:'Hangar Neutro',slotCount:3,duration:60,eggTier:'rare',waves:[w('sprinter',4),w('tank',2)]},
{id:4,name:'Tunnel Gamma',slotCount:3,duration:75,eggTier:'rare',waves:[w('sprinter',3),w('spitter',3),w('tank',2)]},
{id:5,name:'Bassin Alpha',slotCount:3,duration:75,eggTier:'rare',waves:[w('boomer',3),w('sprinter',4),w('tank',2)]},
{id:6,name:'Prison Organique',slotCount:4,duration:90,eggTier:'epic',waves:[w('tank',3),w('spitter',4),w('boomer',3)]},
{id:7,name:'Noyau Perdu',slotCount:4,duration:90,eggTier:'epic',waves:[w('sprinter',6),w('tank',3),w('boomer',2)]},
{id:8,name:'Vortex Mutagène',slotCount:5,duration:90,eggTier:'epic',waves:[w('spitter',4),w('tank',3),w('boomer',3),w('sprinter',5)]},
{id:9,name:'Crypte Cobalt',slotCount:5,duration:90,eggTier:'mythic',waves:[w('sprinter',5),w('boomer',4),w('tank',3),w('spitter',4)]},
{id:10,name:'Titan Zéro',slotCount:5,duration:120,eggTier:'mythic',waves:[w('tank',5),w('boomer',5),w('spitter',5),w('sprinter',8)]},
];

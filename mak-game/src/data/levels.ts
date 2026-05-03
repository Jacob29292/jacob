import type { Level } from '../types';
const mix=(count:number,ids:string[])=>Array.from({length:count},(_,i)=>({typeId:ids[i%ids.length],delay:i*1500}));
export const levels: Level[] = [
{id:1,name:'Labo 01',slots:1,duration:30,eggReward:'common',waves:[mix(3,['sprinter'])]},
{id:2,name:'Labo 02',slots:2,duration:45,eggReward:'common',waves:[mix(5,['sprinter','spitter'])]},
{id:3,name:'Labo 03',slots:3,duration:60,eggReward:'rare',waves:[mix(4,['sprinter']),mix(4,['sprinter','spitter'])]},
{id:4,name:'Labo 04',slots:3,duration:75,eggReward:'rare',waves:[mix(4,['sprinter']),mix(4,['tank','sprinter']),mix(4,['spitter'])]},
{id:5,name:'Labo 05',slots:3,duration:75,eggReward:'rare',waves:[mix(5,['sprinter','exploder']),mix(5,['tank']) ,mix(6,['sprinter','spitter'])]},
{id:6,name:'Labo 06',slots:4,duration:90,eggReward:'epic',waves:[mix(5,['tank','sprinter']),mix(5,['tank','spitter']),mix(6,['tank'])]},
{id:7,name:'Labo 07',slots:4,duration:90,eggReward:'epic',waves:[mix(6,['tank']),mix(7,['spitter','exploder']),mix(7,['tank','sprinter'])]},
{id:8,name:'Labo 08',slots:5,duration:90,eggReward:'epic',waves:[mix(6,['sprinter','spitter']),mix(6,['tank']),mix(6,['exploder']),mix(7,['tank','sprinter'])]},
{id:9,name:'Labo 09',slots:5,duration:90,eggReward:'mythic',waves:[mix(7,['tank','spitter']),mix(7,['exploder','sprinter']),mix(7,['tank']),mix(8,['sprinter','spitter','exploder'])]},
{id:10,name:'Labo BOSS',slots:5,duration:120,eggReward:'mythic',waves:[mix(8,['tank']),mix(8,['tank','exploder']),mix(8,['spitter','exploder']),mix(10,['tank','sprinter'])]}
];

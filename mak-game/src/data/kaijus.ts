import type { Kaiju } from '../types';
export const kaijus: Kaiju[] = [
{id:'crab',name:'CRABE BLINDÉ',rarity:'common',hp:50,dmg:8,cooldown:1500,range:110,dnaCost:10,emoji:'🦀',accent:'#9ca3af',behavior:'single'},
{id:'eye',name:'ŒIL LASER',rarity:'common',hp:20,dmg:15,cooldown:2000,range:260,dnaCost:12,emoji:'👁️',accent:'#9ca3af',behavior:'single'},
{id:'blob',name:'BLOB TOXIQUE',rarity:'rare',hp:30,dmg:5,cooldown:800,range:170,dnaCost:20,emoji:'🟢',accent:'#3b82f6',behavior:'dot'},
{id:'nest',name:'NID MUTANT',rarity:'rare',hp:40,dmg:7,cooldown:1200,range:150,dnaCost:20,emoji:'🥚',accent:'#3b82f6',behavior:'spawn'},
{id:'tentacle',name:'TENTACULE MURAL',rarity:'epic',hp:35,dmg:25,cooldown:3500,range:150,dnaCost:40,emoji:'🐙',accent:'#a855f7',behavior:'stun'},
{id:'golem',name:'GOLEM ORGANIQUE',rarity:'mythic',hp:100,dmg:20,cooldown:2500,range:180,dnaCost:60,emoji:'🗿',accent:'#fbbf24',behavior:'single'}
];

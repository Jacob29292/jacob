import type { Kaiju } from '../types';
export const kaijus: Kaiju[] = [
{id:'crab',name:'Crabe Blindé',rarity:'common',hp:50,dmg:8,cooldown:1500,range:120,dnaCost:0,emoji:'🦀',accent:'#9ca3af',description:'Carapace blindée, encaisse et pince.',behavior:'single'},
{id:'laser',name:'Œil Laser',rarity:'common',hp:20,dmg:15,cooldown:2000,range:280,dnaCost:50,emoji:'👁️',accent:'#3b82f6',description:'Tire un rayon concentré ultra précis.',behavior:'single'},
{id:'blob',name:'Blob Toxique',rarity:'rare',hp:30,dmg:5,cooldown:800,range:190,dnaCost:120,emoji:'🟢',accent:'#22c55e',description:'Projette un nuage corrosif qui ralentit.',behavior:'dot'},
{id:'nest',name:'Nid Mutant',rarity:'rare',hp:40,dmg:6,cooldown:5000,range:160,dnaCost:160,emoji:'🥚',accent:'#a855f7',description:'Pond des mini-mutants agressifs.',behavior:'summon'},
{id:'tentacle',name:'Tentacule Mural',rarity:'epic',hp:35,dmg:25,cooldown:3000,range:210,dnaCost:300,emoji:'🐙',accent:'#a855f7',description:'Agrippe et paralyse sa cible.',behavior:'stun'},
{id:'golem',name:'Golem Organique',rarity:'mythic',hp:100,dmg:20,cooldown:2500,range:200,dnaCost:500,emoji:'🗿',accent:'#fbbf24',description:'Forteresse vivante, coups massifs.',behavior:'single'}
];

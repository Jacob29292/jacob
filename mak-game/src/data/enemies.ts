import type { EnemyType } from '../types';
export const enemies: EnemyType[] = [
{id:'sprinter',name:'Sprinter',hp:20,speed:0.08,coreDamage:10,emoji:'🦎',color:'#00f5ff'},
{id:'tank',name:'Tank',hp:80,speed:0.03,coreDamage:25,emoji:'🦏',color:'#f97316'},
{id:'spitter',name:'Cracheur',hp:30,speed:0.05,coreDamage:12,emoji:'🦂',color:'#d4ff00',special:'ranged'},
{id:'boomer',name:'Exploseur',hp:25,speed:0.05,coreDamage:15,emoji:'💀',color:'#ef4444',special:'explode'}
];

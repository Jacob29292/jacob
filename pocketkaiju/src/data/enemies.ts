import type { Enemy } from '../types';
export const enemies: Enemy[] = [
  { id:'sludgo',name:'Sludgo',tier:'common',maxHp:100,drop:'common',bonus:{rare:0.3},script:['charge','attack','defend','attack'] },
  { id:'voltrax',name:'Voltrax',tier:'rare',maxHp:110,drop:'rare',bonus:{epic:0.2},script:['attack','charge','attack','defend','special'] },
  { id:'magmaw',name:'Magmaw',tier:'epic',maxHp:120,drop:'epic',bonus:{mythic:0.05},script:['charge','charge','attack','defend','special'] }
];

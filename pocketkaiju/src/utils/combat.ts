import type { Action } from '../types';
export const rand=(a:number,b:number)=>Math.floor(Math.random()*(b-a+1))+a;
export const actionDamage=(a:Action)=>a==='special'?rand(40,60):a==='attack'?rand(15,25):0;

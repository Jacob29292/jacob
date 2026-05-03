import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Egg, Rarity, Screen } from '../types';

type State={screen:Screen;level:number;deck:string[];owned:string[];eggs:Egg[];completed:number[];openingEgg?:Egg;setScreen:(s:Screen)=>void;setLevel:(n:number)=>void;saveDeck:(d:string[])=>void;winLevel:(id:number,rarity:Rarity)=>void;openEgg:(id:string)=>void;closeOpening:()=>void;};
const timers={common:30000,rare:120000,epic:300000,mythic:600000}; // prod: 15min/1h/4h/8h
export const useGameStore=create<State>()(persist((set,get)=>({screen:'splash',level:1,deck:['crab'],owned:['crab'],eggs:[],completed:[],
setScreen:(screen)=>set({screen}), setLevel:(level)=>set({level}), saveDeck:(deck)=>set({deck}),
winLevel:(id,rarity)=>set((s)=>({completed:Array.from(new Set([...s.completed,id])),eggs:s.eggs.length<4?[...s.eggs,{id:crypto.randomUUID(),rarity,readyAt:Date.now()+timers[rarity]}]:s.eggs,screen:'victory'})),
openEgg:(id)=>{const egg=get().eggs.find(e=>e.id===id); if(!egg||egg.readyAt>Date.now()) return; const pool=['crab','eye','blob','nest','tentacle','golem']; const reward=pool[Math.floor(Math.random()*pool.length)]; set((s)=>({owned:Array.from(new Set([...s.owned,reward])),eggs:s.eggs.filter(e=>e.id!==id),openingEgg:egg}));},closeOpening:()=>set({openingEgg:undefined})
}),{name:'mak-save'}));

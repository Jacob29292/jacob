import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { parts } from '../data/parts';
import { eggDurations, rollPartRarity } from '../utils/rarity';
import type { Egg, EggTier, Part, PartCategory } from '../types';

type Screen='splash'|'home'|'combat'|'incubator'|'builder'|'collection';
type State={screen:Screen; owned:string[]; equipped:Partial<Record<PartCategory,string>>; eggs:Egg[]; opening?:Part; setScreen:(s:Screen)=>void; addEgg:(t:EggTier)=>void; skipEgg:(id:string)=>void; openEgg:(id:string)=>void; closeOpening:()=>void; equip:(p:Part)=>void};
export const useGameStore=create<State>()(persist((set,get)=>({
  screen:'splash',owned:['head-1','torso-1','arms-1','legs-1','aura-1'],equipped:{head:'head-1',torso:'torso-1',arms:'arms-1',legs:'legs-1',aura:'aura-1'},eggs:[],
  setScreen:(screen)=>set({screen}),
  addEgg:(tier)=>set((s)=>s.eggs.length>=4?s:{eggs:[...s.eggs,{id:crypto.randomUUID(),tier,readyAt:Date.now()+eggDurations[tier],opened:false}]}) ,
  skipEgg:(id)=>set((s)=>({eggs:s.eggs.map(e=>e.id===id?{...e,readyAt:Date.now()-1}:e)})),
  openEgg:(id)=>{const egg=get().eggs.find(e=>e.id===id); if(!egg||Date.now()<egg.readyAt) return; const rarity=rollPartRarity(egg.tier); const pool=parts.filter(p=>p.rarity===rarity); const part=pool[Math.floor(Math.random()*pool.length)]; set((s)=>({opening:part,owned:Array.from(new Set([...s.owned,part.id])),eggs:s.eggs.filter(e=>e.id!==id)}));},
  closeOpening:()=>set({opening:undefined}), equip:(p)=>set((s)=>({equipped:{...s.equipped,[p.category]:p.id}})
  )
}),{name:'pocketkaiju-save'}));

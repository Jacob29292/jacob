import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { kaijus } from '../data/kaijus';
import { levels } from '../data/levels';
import type { Egg, OwnedKaiju, Screen } from '../types';

type S = {screen:Screen; currentLevel:number; completed:number[]; deck:string[]; placements:(string|null)[]; eggs:Egg[]; opening?:string; owned:OwnedKaiju; setScreen:(s:Screen)=>void; startLevel:(id:number)=>void; setPlacement:(slot:number,id:string|null)=>void; win:()=>void; lose:()=>void; addEgg:()=>void; skipEgg:(id:string)=>void; openEgg:(id:string)=>void; closeOpening:()=>void; setDeck:(deck:string[])=>void};
const demoDur={common:30000,rare:120000,epic:300000,mythic:600000}; // prod 15min/1h/4h/8h
export const useGameStore=create<S>()(persist((set,get)=>({
screen:'splash',currentLevel:1,completed:[],deck:['crab'],placements:[],eggs:[],owned:Object.fromEntries(kaijus.map(k=>[k.id,{unlocked:k.id==='crab',dna:0}])),
setScreen:(screen)=>set({screen}),
startLevel:(id)=>set({currentLevel:id,placements:Array(levels[id-1].slotCount).fill(null),screen:'prep'}),
setPlacement:(slot,id)=>set(s=>{const p=[...s.placements];p[slot]=id;return {placements:p};}),
win:()=>{const id=get().currentLevel;set(s=>({completed:Array.from(new Set([...s.completed,id])),screen:'victory'}));},
lose:()=>set({screen:'defeat'}),
addEgg:()=>set(s=>{if(s.eggs.length>=4)return s;const tier=levels[s.currentLevel-1].eggTier;return {eggs:[...s.eggs,{id:crypto.randomUUID(),tier,readyAt:Date.now()+demoDur[tier]}],screen:'incubator'};}),
skipEgg:(id)=>set(s=>({eggs:s.eggs.map(e=>e.id===id?{...e,readyAt:Date.now()-1}:e)})),
openEgg:(id)=>{const egg=get().eggs.find(e=>e.id===id);if(!egg||Date.now()<egg.readyAt)return;const pool=kaijus.filter(k=>k.rarity===egg.tier||Math.random()>0.5);const pick=pool[Math.floor(Math.random()*pool.length)].id;set(s=>({eggs:s.eggs.filter(e=>e.id!==id),opening:pick,owned:{...s.owned,[pick]:{...s.owned[pick],unlocked:true,dna:s.owned[pick].dna+10}}}));},
closeOpening:()=>set({opening:undefined}), setDeck:(deck)=>set({deck})
}),{name:'mak-game-save'}));

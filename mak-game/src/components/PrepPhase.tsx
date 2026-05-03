import { useEffect, useState } from 'react';import { useGameStore } from '../store/gameStore';
export default function PrepPhase(){const {setScreen}=useGameStore();const [t,setT]=useState(15); useEffect(()=>{const i=setInterval(()=>setT(v=>v-1),1000); return ()=>clearInterval(i)},[]); useEffect(()=>{if(t<=0)setScreen('combat')},[t,setScreen]);
return <div className='space-y-3'><div>Placement des kaijus ({t}s)</div><button className='w-full p-3 bg-emerald-600 rounded' onClick={()=>setScreen('combat')}>PRÊT</button></div>}

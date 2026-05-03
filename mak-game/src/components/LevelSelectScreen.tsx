import { levels } from '../data/levels';import { useGameStore } from '../store/gameStore';
export default function LevelSelectScreen(){const {completed,setLevel,setScreen}=useGameStore(); const next=(Math.max(0,...completed)+1);
return <div><h2>Niveaux</h2><div className='grid grid-cols-2 gap-2'>{levels.map(l=><button key={l.id} onClick={()=>{setLevel(l.id);setScreen('prep')}} className='p-3 rounded bg-slate-800'>{l.name} {completed.includes(l.id)?'✅':l.id===next?'⭐':''}</button>)}</div></div>}

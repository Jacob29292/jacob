import { kaijus } from '../data/kaijus';import { useGameStore } from '../store/gameStore';
export default function Collection(){const {owned}=useGameStore();return <div><h2>{owned.length}/6</h2><div className='grid grid-cols-2 gap-2'>{kaijus.map(k=><div key={k.id} className='p-3 rounded bg-slate-800'>{owned.includes(k.id)?k.emoji:'⬛'} {k.name}</div>)}</div></div>}

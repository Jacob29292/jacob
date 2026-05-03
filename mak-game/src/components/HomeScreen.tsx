import { useGameStore } from '../store/gameStore';
export default function HomeScreen(){const {setScreen,eggs}=useGameStore(); const ready=eggs.some(e=>e.readyAt<=Date.now());
return <div className='space-y-4 text-center'><div className='py-6 text-4xl font-bold'>M.A.K.</div><button className='w-full p-4 rounded-xl bg-fuchsia-600' onClick={()=>setScreen('levelSelect')}>JOUER</button><button className='w-full p-4 rounded-xl bg-cyan-600' onClick={()=>setScreen('incubator')}>INCUBATEUR {ready&&'●'}</button><button className='w-full p-4 rounded-xl bg-violet-600' onClick={()=>setScreen('deck')}>DECK</button><button className='w-full p-4 rounded-xl bg-slate-700' onClick={()=>setScreen('collection')}>COLLECTION</button></div>
}

import { useGameStore } from '../store/gameStore';
export default function VictoryScreen(){const {setScreen}=useGameStore();return <div className='text-center space-y-4'><h2 className='text-4xl text-emerald-400'>VICTORY</h2><button className='w-full p-3 rounded bg-cyan-600' onClick={()=>setScreen('incubator')}>AJOUTER À L'INCUBATEUR</button></div>}

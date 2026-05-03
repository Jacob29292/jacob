import { useGameStore } from '../store/gameStore';
export default ()=>{const {startLevel,currentLevel,setScreen}=useGameStore();return <div className='text-center'><h2 className='text-5xl text-red-500'>DEFEAT</h2><button onClick={()=>startLevel(currentLevel)}>RÉESSAYER</button><button onClick={()=>setScreen('home')}>MENU</button></div>}

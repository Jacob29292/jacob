import { useEffect } from 'react';
import { useGameStore } from './store/gameStore';
import HomeScreen from './components/HomeScreen';
import LevelSelectScreen from './components/LevelSelectScreen';
import PrepPhase from './components/PrepPhase';
import CombatScreen from './components/CombatScreen';
import VictoryScreen from './components/VictoryScreen';
import DefeatScreen from './components/DefeatScreen';
import EggIncubator from './components/EggIncubator';
import Collection from './components/Collection';
import DeckBuilder from './components/DeckBuilder';
import EggOpeningModal from './components/EggOpeningModal';

export default function App(){const {screen,setScreen}=useGameStore();useEffect(()=>{const t=setTimeout(()=>setScreen('home'),1500);return()=>clearTimeout(t)},[setScreen]);
return <main className='min-h-screen text-white bg-gradient-to-b from-[#1a0a2e] to-[#0f0520]'><div className='max-w-md mx-auto p-3'>{screen==='splash'&&<div className='text-center py-24 text-5xl font-bold'>M.A.K.</div>}{screen==='home'&&<HomeScreen/>}{screen==='levelSelect'&&<LevelSelectScreen/>}{screen==='prep'&&<PrepPhase/>}{screen==='combat'&&<CombatScreen/>}{screen==='victory'&&<VictoryScreen/>}{screen==='defeat'&&<DefeatScreen/>}{screen==='incubator'&&<EggIncubator/>}{screen==='collection'&&<Collection/>}{screen==='deck'&&<DeckBuilder/>}</div><EggOpeningModal/></main>
}

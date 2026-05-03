import { useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import LevelSelectScreen from './components/LevelSelectScreen';
import PrepPhase from './components/PrepPhase';
import CombatScreen from './components/CombatScreen';
import VictoryScreen from './components/VictoryScreen';
import DefeatScreen from './components/DefeatScreen';
import EggIncubator from './components/EggIncubator';
import EggOpeningModal from './components/EggOpeningModal';
import DeckBuilder from './components/DeckBuilder';
import Collection from './components/Collection';
import { useGameStore } from './store/gameStore';
export default function App(){const {screen,setScreen}=useGameStore();useEffect(()=>{setTimeout(()=>setScreen('home'),1500)},[setScreen]);
return <main className='min-h-screen text-white bg-gradient-to-b from-[#1a0a2e] to-[#0f0520]'><div className='max-w-md mx-auto p-3'>{screen==='splash'&&<SplashScreen/>}{screen==='home'&&<HomeScreen/>}{screen==='levels'&&<LevelSelectScreen/>}{screen==='prep'&&<PrepPhase/>}{screen==='combat'&&<CombatScreen/>}{screen==='victory'&&<VictoryScreen/>}{screen==='defeat'&&<DefeatScreen/>}{screen==='incubator'&&<EggIncubator/>}{screen==='deck'&&<DeckBuilder/>}{screen==='collection'&&<Collection/>}</div><EggOpeningModal/></main>;
}

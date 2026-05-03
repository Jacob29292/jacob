import { motion } from 'framer-motion';
import { parts } from '../data/parts';
import { useGameStore } from '../store/gameStore';

export default function KaijuBuilder() {
  const { owned, equipped, equip } = useGameStore();
  const equippedParts = Object.values(equipped).map((id) => parts.find((x) => x.id === id)).filter(Boolean);
  const total = equippedParts.reduce((a, p) => ({ hp: a.hp + p!.stats.hp, atk: a.atk + p!.stats.atk, def: a.def + p!.stats.def, rageGen: a.rageGen + p!.stats.rageGen }), { hp: 0, atk: 0, def: 0, rageGen: 0 });

  return <div className='p-4 text-white'>
    <div className='text-6xl text-center bg-white/10 rounded-2xl p-4'>{Object.values(equipped).map((id) => { const p = parts.find((x) => x.id === id); return <span key={id} style={{ color: p?.color }}>{p?.visualKey}</span>; })}</div>
    <div className='grid grid-cols-4 gap-2 mt-3 text-center text-sm'>
      <div className='bg-white/10 rounded p-2'>HP<br />+{total.hp}</div><div className='bg-white/10 rounded p-2'>ATK<br />+{total.atk}</div><div className='bg-white/10 rounded p-2'>DEF<br />+{total.def}</div><div className='bg-white/10 rounded p-2'>RAGE<br />+{total.rageGen}</div>
    </div>
    {(['head', 'torso', 'arms', 'legs', 'aura'] as const).map((c) => <div key={c}><h3 className='font-bold mt-4 uppercase text-cyan-300'>{c}</h3><div className='flex gap-2 overflow-auto pb-1'>{parts.filter((p) => p.category === c && owned.includes(p.id)).map((p) => <motion.button whileTap={{ scale: 0.95 }} key={p.id} onClick={() => equip(p)} style={{ borderColor: p.color }} className={`border-2 p-2 rounded-xl min-w-16 ${equipped[c] === p.id ? 'bg-white/20' : 'bg-black/20'}`}>{p.visualKey}</motion.button>)}</div></div>)}
  </div>;
}

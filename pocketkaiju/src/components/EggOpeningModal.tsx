import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { rarityColors } from '../utils/rarity';
import { safePlay } from '../utils/sound';

export default function EggOpeningModal() {
  const { opening, closeOpening } = useGameStore();
  const [phase, setPhase] = useState(0);
  const [typed, setTyped] = useState('');
  const color = useMemo(() => (opening ? rarityColors[opening.rarity] : '#fff'), [opening]);

  useEffect(() => {
    if (!opening) return;
    setPhase(0);
    setTyped('');
    safePlay('crack');
    const timers = [1000, 3000, 4000, 6000].map((ms, i) => setTimeout(() => setPhase(i + 1), ms));
    const sound = setTimeout(() => safePlay(opening.rarity), 4200);
    return () => { timers.forEach(clearTimeout); clearTimeout(sound); };
  }, [opening]);

  useEffect(() => {
    if (!opening || phase < 4) return;
    const text = `+HP ${opening.stats.hp}  +ATK ${opening.stats.atk}  +DEF ${opening.stats.def}  +RAGE ${opening.stats.rageGen}`;
    let i = 0;
    const t = setInterval(() => { i += 1; setTyped(text.slice(0, i)); if (i >= text.length) clearInterval(t); }, 28);
    return () => clearInterval(t);
  }, [opening, phase]);

  if (!opening) return null;

  return (
    <div className='fixed inset-0 bg-black/85 z-50 flex items-center justify-center text-white'>
      {phase >= 2 && <motion.div className='absolute inset-0' initial={{ opacity: 0 }} animate={{ opacity: 0.35 }} style={{ background: `radial-gradient(circle, ${color}88 0%, transparent 65%)` }} />}
      {phase === 3 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.95 }} className='absolute inset-0 bg-white' />}

      <motion.div animate={{ y: [0, -6, 0], rotate: phase < 3 ? [0, -2, 2, 0] : 0 }} transition={{ repeat: phase < 3 ? Infinity : 0, duration: 0.45 }} className='text-center relative z-10 px-6'>
        {phase < 3 && <motion.div initial={{ scale: .8 }} animate={{ scale: [0.9, 1.15, 1] }} transition={{ repeat: Infinity, duration: .8 }} className='text-8xl'>🥚</motion.div>}

        {phase >= 1 && phase < 3 && <div className='flex justify-center gap-2 mt-2'>{Array.from({ length: opening.rarity === 'mythic' ? 12 : 6 }).map((_, i) => <motion.span key={i} animate={{ y: [0, -12, 0], opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1 + i * 0.07 }} style={{ color }}>*</motion.span>)}</div>}

        {phase >= 3 && <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 360 }} transition={{ type: 'spring', bounce: 0.45 }} className='text-9xl drop-shadow-[0_0_25px_currentColor]' style={{ color }}>{opening.visualKey}</motion.div>}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: phase >= 3 ? 1 : 0 }} className='text-4xl font-bold mt-4' style={{ color }}>{opening.rarity.toUpperCase()}</motion.div>
        <p className='text-xl font-semibold'>{opening.name}</p>
        <p className='mt-2 text-sm opacity-90 min-h-[24px]'>{typed}</p>

        {phase >= 4 && <motion.button whileTap={{ scale: 0.95 }} onClick={closeOpening} className='mt-5 bg-yellow-400 text-black p-3 rounded-2xl font-bold shadow-[0_0_20px_#ffbe0b]'>AWESOME</motion.button>}
      </motion.div>
    </div>
  );
}

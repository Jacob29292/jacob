import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { parts } from '../data/parts';

const Btn = ({ t, s, disabled = false }: { t: string; s: any; disabled?: boolean }) => (
  <motion.button
    whileTap={{ scale: 0.96 }}
    onClick={() => !disabled && useGameStore.getState().setScreen(s)}
    className={`rounded-2xl p-3 font-bold shadow-xl ${disabled ? 'bg-slate-600 opacity-70' : 'bg-pink-500'}`}
  >
    {t}
  </motion.button>
);

export default function HomeScreen() {
  const { equipped, eggs } = useGameStore();
  const eq = Object.values(equipped).map((id) => parts.find((p) => p.id === id));
  const ready = eggs.filter((e) => e.readyAt < Date.now()).length;
  const isIncubatorFull = eggs.length >= 4;

  return (
    <div className='p-4 text-white'>
      <div className='text-center text-3xl font-bold'>Ton Kaiju</div>
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className='my-8 text-7xl text-center drop-shadow-[0_0_18px_#00f5ff]'>
        {eq.map((p) => <span key={p?.id} style={{ color: p?.color }}>{p?.visualKey}</span>)}
      </motion.div>

      {isIncubatorFull && <p className='mb-3 text-center text-yellow-300 font-semibold'>Incubateur plein: ouvre un œuf avant de relancer un combat.</p>}

      <div className='grid grid-cols-2 gap-3'>
        <Btn t='COMBAT' s='combat' disabled={isIncubatorFull} />
        <button onClick={() => useGameStore.getState().setScreen('incubator')} className='bg-cyan-500 rounded-2xl p-3 font-bold shadow-xl'>
          INCUBATEUR {ready > 0 && <span className='ml-1 bg-yellow-300 text-black px-2 rounded-full'>{ready}</span>}
        </button>
        <Btn t='KAIJU BUILDER' s='builder' />
        <Btn t='COLLECTION' s='collection' />
      </div>
    </div>
  );
}

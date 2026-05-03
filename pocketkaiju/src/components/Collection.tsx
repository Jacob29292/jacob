import { motion } from 'framer-motion';
import { parts } from '../data/parts';
import { useGameStore } from '../store/gameStore';

export default function Collection() {
  const owned = useGameStore((s) => s.owned);
  return <div className='p-4 text-white'>
    <h2 className='text-2xl font-bold mb-3'>Collection {owned.length}/{parts.length}</h2>
    <div className='grid grid-cols-4 gap-2'>
      {parts.map((p) => {
        const has = owned.includes(p.id);
        return <motion.div key={p.id} whileTap={{ scale: 0.97 }} className='p-2 rounded-xl text-center border border-white/10' style={{ opacity: has ? 1 : .35, color: has ? p.color : '#9ca3af', background: has ? `${p.color}22` : '#ffffff11' }}>
          <div className='text-2xl'>{p.visualKey}</div><div className='text-[10px] leading-tight'>{p.name}</div>
        </motion.div>;
      })}
    </div>
  </div>;
}

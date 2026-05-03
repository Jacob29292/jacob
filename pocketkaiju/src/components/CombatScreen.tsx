import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import { enemies } from '../data/enemies';
import { parts } from '../data/parts';
import { useGameStore } from '../store/gameStore';
import { actionDamage } from '../utils/combat';

type Action = 'attack' | 'charge' | 'defend' | 'special';
type Fx = { id: number; side: 'player' | 'enemy'; value: string; color: string };

const enemyEmoji: Record<string, string> = { sludgo: '🧪', voltrax: '⚡', magmaw: '🌋' };
const hpColor = (v: number) => (v > 50 ? 'from-emerald-400 to-emerald-600' : v > 25 ? 'from-yellow-300 to-amber-500' : 'from-red-400 to-red-700');

export default function CombatScreen() {
  const equipped = useGameStore((s) => s.equipped);
  const build = Object.values(equipped).map((id) => parts.find((p) => p.id === id)).filter(Boolean);
  const bonus = build.reduce((a, p) => ({ hp: a.hp + p!.stats.hp, atk: a.atk + p!.stats.atk, def: a.def + p!.stats.def, rage: a.rage + p!.stats.rageGen }), { hp: 0, atk: 0, def: 0, rage: 0 });
  const [hp, setHp] = useState(Math.min(160, 100 + bonus.hp));
  const [ehp, setEhp] = useState(100);
  const [rage, setRage] = useState(0);
  const [mult, setMult] = useState(1);
  const [turn, setTurn] = useState(1);
  const [active, setActive] = useState<'player' | 'enemy'>('player');
  const [dash, setDash] = useState<'player' | 'enemy' | null>(null);
  const [hitFlash, setHitFlash] = useState<'player' | 'enemy' | null>(null);
  const [chargeAura, setChargeAura] = useState<'player' | 'enemy' | null>(null);
  const [defShield, setDefShield] = useState<'player' | 'enemy' | null>(null);
  const [shake, setShake] = useState(0);
  const [specialFlash, setSpecialFlash] = useState(false);
  const [fx, setFx] = useState<Fx[]>([]);
  const [isDead, setIsDead] = useState<'player' | 'enemy' | null>(null);
  const [enemy] = useState(enemies[Math.floor(Math.random() * 3)]);
  const [enemyTurnIndex, setEnemyTurnIndex] = useState(0);
  const [guard, setGuard] = useState(false);
  const addEgg = useGameStore((s) => s.addEgg);

  const spawnFx = (side: 'player' | 'enemy', value: string, color: string) => {
    const id = Date.now() + Math.random();
    setFx((f) => [...f, { id, side, value, color }]);
    setTimeout(() => setFx((f) => f.filter((x) => x.id !== id)), 900);
  };

  const triggerHit = (side: 'player' | 'enemy', value: number, special = false) => {
    setHitFlash(side);
    setShake(special ? 18 : 7);
    spawnFx(side, `-${value}`, special ? '#fb923c' : '#ef4444');
    setTimeout(() => setHitFlash(null), 220);
    setTimeout(() => setShake(0), 300);
  };

  const enemyTurn = () => {
    setActive('enemy');
    setTimeout(() => {
      const enemyAction = enemy.script[enemyTurnIndex % enemy.script.length] ?? 'attack';
      setEnemyTurnIndex((v) => v + 1);
      const isSpecial = enemyAction === 'special';
      const base = actionDamage(isSpecial ? 'special' : 'attack');
      const ed = Math.max(6, Math.floor(base * (guard ? 0.5 : 1) - bonus.def * 0.25));
      setDash('enemy');
      setTimeout(() => {
        setHp((v) => {
          const n = Math.max(0, v - ed);
          if (n <= 0) { setIsDead('player'); setShake(24); }
          return n;
        });
        triggerHit('player', ed, isSpecial);
        setGuard(false);
        setRage((v) => Math.min(100, v + 10));
      }, 150);
      setTimeout(() => setDash(null), 300);
      setTimeout(() => { setTurn((t) => t + 1); setActive('player'); }, isSpecial ? 850 : 550);
    }, 420);
  };

  const act = (a: Action) => {
    if (active !== 'player' || isDead) return;
    if (a === 'special' && rage < 100) return;
    let d = 0;
    if (a === 'attack' || a === 'special') {
      d = Math.floor((actionDamage(a) + bonus.atk * 0.35) * mult);
      setMult(1);
      if (a === 'special') { setSpecialFlash(true); setShake(20); setTimeout(() => setSpecialFlash(false), 500); }
      setDash('player');
      setTimeout(() => {
        setEhp((v) => {
          const n = Math.max(0, v - d);
          if (n <= 0) { setIsDead('enemy'); setShake(30); }
          return n;
        });
        triggerHit('enemy', d, a === 'special');
      }, 150);
      setTimeout(() => setDash(null), 300);
    }
    if (a === 'charge') { setMult((v) => Math.min(3, v * 1.5)); setChargeAura('player'); setTimeout(() => setChargeAura(null), 1000); }
    if (a === 'defend') { setGuard(true); setDefShield('player'); spawnFx('player', '+5', '#22c55e'); setHp((v) => Math.min(160, v + 5)); setTimeout(() => setDefShield(null), 500); }
    setRage((v) => (a === 'special' ? 0 : Math.min(100, v + 25 + bonus.rage)));
    if (ehp - d <= 0) return;
    enemyTurn();
  };

  const arenaShake = useMemo(() => (shake ? { x: [0, -shake, shake, -shake * 0.6, 0] } : {}), [shake]);

  if (ehp <= 0) return <div className='p-4 text-white'><h2 className='text-4xl font-bold text-yellow-300'>VICTORY</h2><button onClick={() => { addEgg(enemy.drop); useGameStore.getState().setScreen('home'); }} className='mt-4 bg-yellow-400 text-black p-3 rounded-2xl font-bold'>AJOUTER À L'INCUBATEUR</button></div>;

  return (
    <motion.div animate={arenaShake} transition={{ duration: 0.28 }} className='relative overflow-hidden text-white min-h-[90vh] p-3'>
      <div className='absolute inset-0 bg-gradient-to-b from-violet-900 via-fuchsia-900 to-indigo-950' />
      <motion.div className='absolute inset-0 opacity-30' animate={{ x: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 10, ease: 'linear' }} style={{ background: 'radial-gradient(circle at 20% 30%, #ff006e66 0, transparent 30%)' }} />
      <motion.div className='absolute inset-0 opacity-20' animate={{ x: [0, 30, 0] }} transition={{ repeat: Infinity, duration: 14, ease: 'linear' }} style={{ background: 'radial-gradient(circle at 70% 70%, #00f5ff66 0, transparent 25%)' }} />
      <motion.div className='absolute inset-0 opacity-15' animate={{ x: [0, -45, 0] }} transition={{ repeat: Infinity, duration: 18, ease: 'linear' }} style={{ background: 'radial-gradient(circle at 50% 15%, #ffbe0b66 0, transparent 22%)' }} />

      <div className='relative z-10'>
        <button onClick={() => useGameStore.getState().setScreen('home')} className='text-xs bg-black/30 px-2 py-1 rounded-lg'>← Home</button>
        <p className='text-center text-sm opacity-80'>Tour {turn} · Combo x{mult.toFixed(1)} {guard ? '· Garde active' : ''}</p>

        <div className='mt-6 grid grid-cols-2 gap-4 items-end'>
          {([['player', hp, '🦖'], ['enemy', ehp, enemyEmoji[enemy.id] ?? '👾']] as const).map(([side, life, emoji]) => (
            <div key={side} className='relative text-center'>
              <p className='text-2xl font-black'>{life}</p>
              <div className='h-4 bg-white/20 rounded-full overflow-hidden border border-white/30'><motion.div animate={{ width: `${Math.max(0, life)}%` }} className={`h-full bg-gradient-to-r ${hpColor(life)}`} /></div>
              <div className='h-2 mt-1 bg-white/10 rounded-full overflow-hidden'><motion.div animate={{ width: `${side === 'player' ? rage : 60}%` }} className={`h-full ${side === 'player' ? 'bg-[#ff006e]' : 'bg-pink-300'} ${side === 'player' && rage >= 100 ? 'shadow-[0_0_14px_#ff006e]' : ''}`} /></div>

              <motion.div animate={{ scale: active === side ? 1.05 : 1, filter: active === side ? 'drop-shadow(0 0 20px #00f5ff)' : 'drop-shadow(0 10px 10px #000)' }} className='text-8xl md:text-9xl mt-4 relative'>
                <motion.div animate={{ x: dash === side ? (side === 'player' ? 80 : -80) : 0, scale: specialFlash && side === 'player' ? 1.3 : 1, rotate: isDead === side ? 180 : 0, opacity: isDead === side ? 0 : 1 }} transition={{ duration: 0.3 }}>{emoji}</motion.div>
                {hitFlash === side && <div className='absolute inset-0 bg-red-500/40 rounded-full' />}
                {chargeAura === side && <motion.div initial={{ scale: .7, opacity: .9 }} animate={{ scale: 1.4, opacity: 0 }} transition={{ duration: 1 }} className='absolute inset-0 rounded-full border-4 border-yellow-300' />}
                {defShield === side && <motion.div initial={{ opacity: 0 }} animate={{ opacity: .7 }} exit={{ opacity: 0 }} className='absolute inset-0 rounded-full bg-blue-300/30 border border-blue-200' />}
              </motion.div>

              <AnimatePresence>{fx.filter((f) => f.side === side).map((f) => <motion.div key={f.id} initial={{ y: 0, opacity: 1 }} animate={{ y: -60, opacity: 0 }} exit={{ opacity: 0 }} className='absolute left-1/2 -translate-x-1/2 top-24 text-4xl font-bold' style={{ color: f.color }}>{f.value}</motion.div>)}</AnimatePresence>
            </div>
          ))}
        </div>

        <div className='grid grid-cols-2 gap-3 mt-10'>
          <button disabled={active !== 'player'} onClick={() => act('attack')} className='rounded-3xl p-4 font-extrabold bg-gradient-to-b from-rose-400 to-red-700 disabled:grayscale disabled:opacity-60'>ATTACK</button>
          <button disabled={active !== 'player'} onClick={() => act('charge')} className='rounded-3xl p-4 font-extrabold bg-gradient-to-b from-yellow-300 to-amber-500 disabled:grayscale disabled:opacity-60 text-black'>CHARGE</button>
          <button disabled={active !== 'player'} onClick={() => act('defend')} className='rounded-3xl p-4 font-extrabold bg-gradient-to-b from-cyan-300 to-blue-700 disabled:grayscale disabled:opacity-60'>DEFEND</button>
          <button disabled={active !== 'player' || rage < 100} onClick={() => act('special')} className='rounded-3xl p-4 font-extrabold bg-gradient-to-b from-fuchsia-300 to-[#ff006e] disabled:grayscale disabled:opacity-60 shadow-[0_0_25px_#ff006e]'>SPECIAL</button>
        </div>
      </div>
      {specialFlash && <motion.div initial={{ opacity: 0 }} animate={{ opacity: .9 }} exit={{ opacity: 0 }} className='absolute inset-0 bg-white z-20 pointer-events-none' />}
    </motion.div>
  );
}

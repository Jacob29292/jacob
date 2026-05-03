import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { enemies } from '../data/enemies';
import { parts } from '../data/parts';
import { useGameStore } from '../store/gameStore';
import { actionDamage } from '../utils/combat';

type Action = 'attack' | 'charge' | 'defend' | 'special';
type Side = 'player' | 'enemy';
type Fx = { id: number; side: Side; label: string; color: string };

const enemyEmoji: Record<string, string> = { sludgo: '🧪', voltrax: '⚡', magmaw: '🌋' };
const hpColor = (v: number, max: number) => (v / max > 0.5 ? 'from-emerald-400 to-emerald-600' : v / max > 0.25 ? 'from-yellow-300 to-amber-500' : 'from-red-400 to-red-700');

export default function CombatScreen() {
  const equipped = useGameStore((s) => s.equipped);
  const build = Object.values(equipped).map((id) => parts.find((p) => p.id === id)).filter(Boolean);
  const bonus = build.reduce((a, p) => ({ hp: a.hp + p!.stats.hp, atk: a.atk + p!.stats.atk, def: a.def + p!.stats.def, rage: a.rage + p!.stats.rageGen }), { hp: 0, atk: 0, def: 0, rage: 0 });
  const maxHp = Math.min(180, 100 + bonus.hp);

  const [enemy] = useState(enemies[Math.floor(Math.random() * 3)]);
  const [hp, setHp] = useState(maxHp);
  const [ehp, setEhp] = useState(enemy.maxHp);
  const [rage, setRage] = useState(0);
  const [enemyRage, setEnemyRage] = useState(0);
  const [energy, setEnergy] = useState(3);
  const [turn, setTurn] = useState(1);
  const [active, setActive] = useState<Side>('player');
  const [enemyTurnIndex, setEnemyTurnIndex] = useState(0);
  const [mult, setMult] = useState(1);
  const [guard, setGuard] = useState(false);
  const [stunEnemy, setStunEnemy] = useState(false);

  const [dash, setDash] = useState<Side | null>(null);
  const [hitFlash, setHitFlash] = useState<Side | null>(null);
  const [fx, setFx] = useState<Fx[]>([]);
  const [shake, setShake] = useState(0);
  const [specialFlash, setSpecialFlash] = useState(false);

  const addEgg = useGameStore((s) => s.addEgg);

  const spawnFx = (side: Side, label: string, color: string) => {
    const id = Date.now() + Math.random();
    setFx((f) => [...f, { id, side, label, color }]);
    setTimeout(() => setFx((f) => f.filter((x) => x.id !== id)), 900);
  };
  const applyHit = (side: Side, dmg: number, crit = false) => {
    setHitFlash(side);
    spawnFx(side, `-${dmg}`, crit ? '#fb923c' : '#ef4444');
    setShake(crit ? 16 : 7);
    setTimeout(() => setHitFlash(null), 180);
    setTimeout(() => setShake(0), 260);
  };

  const enemyIntent = useMemo(() => {
    if (enemyRage >= 100) return 'SPECIAL';
    return (enemy.script[enemyTurnIndex % enemy.script.length] ?? 'attack').toUpperCase();
  }, [enemy, enemyTurnIndex, enemyRage]);

  const enemyTurn = () => {
    setActive('enemy');
    setTimeout(() => {
      if (stunEnemy) {
        spawnFx('enemy', 'STUN', '#22d3ee');
        setStunEnemy(false);
        setTurn((t) => t + 1);
        setEnergy(3);
        setActive('player');
        return;
      }
      const scripted = enemy.script[enemyTurnIndex % enemy.script.length] ?? 'attack';
      setEnemyTurnIndex((v) => v + 1);
      const a: Action = enemyRage >= 100 ? 'special' : scripted;
      let d = 0;
      if (a === 'attack' || a === 'special') {
        const raw = actionDamage(a) + (a === 'special' ? 6 : 0);
        d = Math.max(5, Math.floor(raw * (guard ? 0.5 : 1) - bonus.def * 0.22));
        setDash('enemy');
        setTimeout(() => {
          setHp((v) => Math.max(0, v - d));
          applyHit('player', d, a === 'special');
          setRage((v) => Math.min(100, v + 10));
          setGuard(false);
        }, 150);
        setTimeout(() => setDash(null), 320);
      }
      if (a === 'charge') { setEnemyRage((v) => Math.min(100, v + 35)); spawnFx('enemy', 'CHARGE', '#fde047'); }
      if (a === 'defend') { spawnFx('enemy', '+5', '#22c55e'); setEhp((v) => Math.min(enemy.maxHp, v + 5)); }
      if (a === 'special') setEnemyRage(0); else setEnemyRage((v) => Math.min(100, v + 20));
      setTimeout(() => { setTurn((t) => t + 1); setEnergy(3); setActive('player'); }, a === 'special' ? 850 : 550);
    }, 350);
  };

  const act = (a: Action) => {
    if (active !== 'player') return;
    const costs: Record<Action, number> = { attack: 1, charge: 1, defend: 1, special: 2 };
    if (energy < costs[a]) return;
    if (a === 'special' && rage < 100) return;
    setEnergy((v) => v - costs[a]);

    let d = 0;
    if (a === 'attack' || a === 'special') {
      d = Math.floor((actionDamage(a) + bonus.atk * 0.35) * mult);
      if (a === 'special') { setSpecialFlash(true); setTimeout(() => setSpecialFlash(false), 400); }
      setDash('player');
      setTimeout(() => {
        setEhp((v) => Math.max(0, v - d));
        applyHit('enemy', d, a === 'special');
      }, 150);
      setTimeout(() => setDash(null), 320);
      setMult(1);
    }
    if (a === 'charge') { setMult((v) => Math.min(3, v * 1.5)); spawnFx('player', 'POWER UP', '#fde047'); }
    if (a === 'defend') { setGuard(true); setHp((v) => Math.min(maxHp, v + 5)); spawnFx('player', '+5', '#22c55e'); }
    if (a === 'special') { setRage(0); setStunEnemy(true); } else { setRage((v) => Math.min(100, v + 25 + bonus.rage)); }

    const left = energy - costs[a];
    if (ehp - d <= 0) return;
    if (left <= 0) enemyTurn();
  };

  const arenaShake = shake ? { x: [0, -shake, shake, 0] } : {};

  if (ehp <= 0) return <div className='p-4 text-white'><h2 className='text-4xl font-bold text-yellow-300'>VICTORY</h2><button onClick={() => { addEgg(enemy.drop); useGameStore.getState().setScreen('home'); }} className='mt-4 bg-yellow-400 text-black p-3 rounded-2xl font-bold'>AJOUTER À L'INCUBATEUR</button></div>;

  return <motion.div animate={arenaShake} className='relative min-h-[90vh] overflow-hidden text-white p-3'>
    <div className='absolute inset-0 bg-gradient-to-b from-violet-900 via-fuchsia-900 to-indigo-950' />
    <div className='relative z-10'>
      <button onClick={() => useGameStore.getState().setScreen('home')} className='text-xs bg-black/30 px-2 py-1 rounded-lg'>← Home</button>
      <p className='text-center text-sm opacity-80'>Tour {turn} · Énergie {energy}/3 · Intent ennemi: {enemyIntent}</p>

      <div className='mt-6 grid grid-cols-2 gap-4 items-end'>
        {([['player', hp, maxHp, '🦖'], ['enemy', ehp, enemy.maxHp, enemyEmoji[enemy.id] ?? '👾']] as const).map(([side, life, max, emoji]) => <div key={side} className='relative text-center'>
          <p className='text-2xl font-black'>{life}</p>
          <div className='h-4 bg-white/20 rounded-full overflow-hidden border border-white/30'><motion.div animate={{ width: `${Math.max(0, (life / max) * 100)}%` }} className={`h-full bg-gradient-to-r ${hpColor(life, max)}`} /></div>
          <div className='h-2 mt-1 bg-white/10 rounded-full overflow-hidden'><motion.div animate={{ width: `${side === 'player' ? rage : enemyRage}%` }} className={`h-full ${side === 'player' ? 'bg-[#ff006e]' : 'bg-pink-300'}`} /></div>
          <motion.div animate={{ x: dash === side ? (side === 'player' ? 80 : -80) : 0, scale: active === side ? 1.06 : 1 }} className='text-8xl mt-4 relative'>
            {emoji}
            {hitFlash === side && <div className='absolute inset-0 bg-red-500/40 rounded-full' />}
          </motion.div>
          <AnimatePresence>{fx.filter((f) => f.side === side).map((f) => <motion.div key={f.id} initial={{ y: 0, opacity: 1 }} animate={{ y: -60, opacity: 0 }} className='absolute left-1/2 -translate-x-1/2 top-24 text-2xl font-bold' style={{ color: f.color }}>{f.label}</motion.div>)}</AnimatePresence>
        </div>)}
      </div>

      <div className='grid grid-cols-2 gap-3 mt-10'>
        <button disabled={active !== 'player' || energy < 1} onClick={() => act('attack')} className='rounded-3xl p-4 font-extrabold bg-gradient-to-b from-rose-400 to-red-700 disabled:grayscale disabled:opacity-60'>ATTACK (1)</button>
        <button disabled={active !== 'player' || energy < 1} onClick={() => act('charge')} className='rounded-3xl p-4 font-extrabold bg-gradient-to-b from-yellow-300 to-amber-500 text-black disabled:grayscale disabled:opacity-60'>CHARGE (1)</button>
        <button disabled={active !== 'player' || energy < 1} onClick={() => act('defend')} className='rounded-3xl p-4 font-extrabold bg-gradient-to-b from-cyan-300 to-blue-700 disabled:grayscale disabled:opacity-60'>DEFEND (1)</button>
        <button disabled={active !== 'player' || rage < 100 || energy < 2} onClick={() => act('special')} className='rounded-3xl p-4 font-extrabold bg-gradient-to-b from-fuchsia-300 to-[#ff006e] disabled:grayscale disabled:opacity-60 shadow-[0_0_25px_#ff006e]'>SPECIAL (2)</button>
      </div>
      {active === 'player' && <button onClick={() => enemyTurn()} className='w-full mt-3 text-xs bg-white/10 rounded-xl p-2'>TERMINER LE TOUR</button>}
    </div>
    {specialFlash && <motion.div initial={{ opacity: 0 }} animate={{ opacity: .8 }} className='absolute inset-0 bg-white pointer-events-none' />}
  </motion.div>;
}

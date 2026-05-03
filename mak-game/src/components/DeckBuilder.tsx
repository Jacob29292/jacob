import { kaijus } from '../data/kaijus';import { useGameStore } from '../store/gameStore';
export default function DeckBuilder(){const {owned,deck,saveDeck}=useGameStore(); const toggle=(id:string)=>deck.includes(id)?saveDeck(deck.filter(d=>d!==id)):deck.length<5&&saveDeck([...deck,id]);
return <div><h2>Deck ({deck.length}/5)</h2><div className='grid grid-cols-2 gap-2'>{kaijus.filter(k=>owned.includes(k.id)).map(k=><button key={k.id} className='p-3 rounded bg-slate-800' onClick={()=>toggle(k.id)}>{deck.includes(k.id)?'✅':'▫️'} {k.name}</button>)}</div></div>}

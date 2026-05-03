import { useEffect } from 'react';
import { launchGame } from './phaser/game';

export default function App() {
  useEffect(() => {
    const game = launchGame('game-root');
    return () => game.destroy(true);
  }, []);

  return <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#05070f' }}><div id='game-root' /></main>;
}

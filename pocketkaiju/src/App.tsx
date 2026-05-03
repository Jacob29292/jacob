import { useEffect } from 'react';
import { launchGame } from './phaser/game';

export default function App() {
  useEffect(() => {
    const game = launchGame('game-root');
    return () => game.destroy(true);
  }, []);

  return (
    <main style={{ width: '100vw', height: '100vh', display: 'grid', placeItems: 'center', background: '#05070f' }}>
      <div id='game-root' style={{ width: 1200, height: 720, border: '1px solid #1f2b4a', borderRadius: 8, overflow: 'hidden' }} />
    </main>
  );
}

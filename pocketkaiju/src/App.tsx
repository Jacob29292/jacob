import type Phaser from 'phaser';
import { useEffect, useRef } from 'react';
import { launchGame } from './phaser/game';

export default function App() {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    console.log('[DEBUG] App mounted, launching Phaser');
    const parent = document.getElementById('game-root');
    if (!parent) return;
    if (gameRef.current) return;

    const onReady = (evt: Event) => {
      const e = evt as CustomEvent<{ scene: string }>;
      if (e.detail?.scene === 'MenuScene') {
        document.getElementById('phaser-launch-error')?.remove();
      }
    };
    window.addEventListener('phaser-scene-ready', onReady);

    const fallback = setTimeout(() => {
      if (!document.getElementById('phaser-launch-error')) {
        const err = document.createElement('div');
        err.id = 'phaser-launch-error';
        err.textContent = "Erreur : la scène Phaser ne s’est pas chargée. Regarde la console.";
        err.style.position = 'absolute';
        err.style.top = '8px';
        err.style.left = '8px';
        err.style.padding = '8px 12px';
        err.style.background = '#5c1f1f';
        err.style.color = '#fff';
        err.style.zIndex = '20';
        document.body.appendChild(err);
      }
    }, 2500);

    gameRef.current = launchGame('game-root');

    return () => {
      clearTimeout(fallback);
      window.removeEventListener('phaser-scene-ready', onReady);
      document.getElementById('phaser-launch-error')?.remove();
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return (
    <main style={{ width: '100vw', height: '100vh', display: 'grid', placeItems: 'center', background: '#05070f', position: 'relative' }}>
      <div id='game-root' style={{ width: 1200, height: 720, border: '1px solid #1f2b4a', borderRadius: 8, overflow: 'hidden', display: 'block', opacity: 1 }} />
    </main>
  );
}

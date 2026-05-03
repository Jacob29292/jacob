import Phaser from 'phaser';

export interface MatchStats {
  coreDamage: number;
  kaijusEliminated: number;
  adnGained: number;
}

export const formatTime = (ms: number): string => {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = String(Math.floor(total / 60)).padStart(2, '0');
  const s = String(total % 60).padStart(2, '0');
  return `${m}:${s}`;
};

export const floatingText = (scene: Phaser.Scene, x: number, y: number, text: string, color = '#ffd166'): void => {
  const t = scene.add.text(x, y, text, { fontSize: '16px', color, fontStyle: 'bold' }).setOrigin(0.5);
  scene.tweens.add({ targets: t, y: y - 25, alpha: 0, duration: 650, onComplete: () => t.destroy() });
};

export const popImpact = (scene: Phaser.Scene, x: number, y: number, color = 0xffffff): void => {
  const c = scene.add.circle(x, y, 6, color, 0.8);
  scene.tweens.add({ targets: c, scale: 2.5, alpha: 0, duration: 180, onComplete: () => c.destroy() });
};

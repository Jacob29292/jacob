import Phaser from 'phaser';
import { AttackTestScene } from './scenes/AttackTestScene';
import { CollectionScene } from './scenes/CollectionScene';
import { DefenseTestScene } from './scenes/DefenseTestScene';
import { MenuScene } from './scenes/MenuScene';

export const launchGame = (parent: string): Phaser.Game => {
  const parentEl = document.getElementById(parent);
  console.log('[DEBUG] launchGame called', { parent, parentExists: !!parentEl });

  return new Phaser.Game({
    type: Phaser.CANVAS,
    width: 1200,
    height: 720,
    parent,
    backgroundColor: '#0b1020',
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 1200,
      height: 720
    },
    scene: [MenuScene, AttackTestScene, DefenseTestScene, CollectionScene]
  });
};

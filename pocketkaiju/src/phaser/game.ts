import Phaser from 'phaser';
import { AttackTestScene } from './scenes/AttackTestScene';
import { BootScene } from './scenes/BootScene';
import { CollectionScene } from './scenes/CollectionScene';
import { DefenseTestScene } from './scenes/DefenseTestScene';
import { MenuScene } from './scenes/MenuScene';

export const launchGame = (parent: string): Phaser.Game => new Phaser.Game({
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
  scene: [BootScene, MenuScene, AttackTestScene, DefenseTestScene, CollectionScene]
});

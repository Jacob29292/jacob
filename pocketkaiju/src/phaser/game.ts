import Phaser from 'phaser';
import { AttackTestScene } from './scenes/AttackTestScene';
import { CollectionScene } from './scenes/CollectionScene';
import { DefenseTestScene } from './scenes/DefenseTestScene';
import { MenuScene } from './scenes/MenuScene';

export const launchGame = (parent: string): Phaser.Game => new Phaser.Game({
  type: Phaser.AUTO,
  width: 640,
  height: 440,
  parent,
  scene: [MenuScene, AttackTestScene, DefenseTestScene, CollectionScene],
  backgroundColor: '#0b1020'
});

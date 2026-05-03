import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }

  create(): void {
    this.cameras.main.setBackgroundColor('#10233d');
    this.add.rectangle(600, 360, 1200, 720, 0x14335b);
    this.add.text(600, 300, 'Kaiju Core Wars', { fontSize: '64px', color: '#8bf2ff' }).setOrigin(0.5);
    this.add.text(600, 380, 'Tap / Click to enter', { fontSize: '28px', color: '#ffffff' }).setOrigin(0.5);

    this.input.once('pointerdown', () => this.scene.start('MenuScene'));
    this.time.delayedCall(200, () => {
      // fallback auto-start for desktop when click isn't needed
      this.scene.start('MenuScene');
    });
  }
}

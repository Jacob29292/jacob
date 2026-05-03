import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() { super('MenuScene'); }

  create(): void {
    this.cameras.main.setBackgroundColor('#0f1226');
    this.add.text(320, 65, 'Kaiju Core Wars', { fontSize: '40px', color: '#8bf2ff' }).setOrigin(0.5);
    this.add.text(320, 105, 'Prototype attaque / défense', { fontSize: '18px', color: '#ffffff' }).setOrigin(0.5);

    this.button(320, 200, 'Play Attack Test', () => this.scene.start('AttackTestScene'));
    this.button(320, 280, 'Play Defense Test', () => this.scene.start('DefenseTestScene'));
    this.button(320, 360, 'Collection', () => this.scene.start('CollectionScene'));
  }

  private button(x: number, y: number, label: string, onClick: () => void): void {
    const rect = this.add.rectangle(x, y, 260, 58, 0x2d3f80).setStrokeStyle(2, 0x8bf2ff).setInteractive();
    this.add.text(x, y, label, { fontSize: '22px', color: '#fff' }).setOrigin(0.5);
    rect.on('pointerdown', onClick);
  }
}

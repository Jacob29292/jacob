import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() { super('MenuScene'); }

  create(): void {
    console.log('[DEBUG] MenuScene create() called');
    this.cameras.main.setBackgroundColor('#0f1226');

    this.add.rectangle(600, 360, 320, 180, 0xff0000);
    this.add.text(600, 340, 'MENU SCENE LOADED', { fontSize: '34px', color: '#ffffff' }).setOrigin(0.5);

    this.add.text(600, 120, 'Kaiju Core Wars', { fontSize: '72px', color: '#8bf2ff' }).setOrigin(0.5);
    this.button(600, 420, 'Play Attack Test', () => this.go('AttackTestScene'));
    this.button(600, 510, 'Play Defense Test', () => this.go('DefenseTestScene'));
    this.button(600, 600, 'Collection', () => this.go('CollectionScene'));

    this.add.text(10, 10, 'DEBUG: Phaser loaded', { fontSize: '20px', color: '#ffff66' });
    this.add.text(10, 35, 'DEBUG: MenuScene create() called', { fontSize: '20px', color: '#66ffcc' });

    window.dispatchEvent(new CustomEvent('phaser-scene-ready', {
      detail: { scene: 'MenuScene' }
    }));
  }

  private go(k: string): void {
    this.scene.start(k);
  }

  private button(x: number, y: number, l: string, cb: () => void): void {
    const r = this.add.rectangle(x, y, 400, 70, 0x2d3f80).setStrokeStyle(3, 0x8bf2ff).setInteractive();
    this.add.text(x, y, l, { fontSize: '34px', color: '#ffffff' }).setOrigin(0.5);
    r.on('pointerdown', cb);
  }
}

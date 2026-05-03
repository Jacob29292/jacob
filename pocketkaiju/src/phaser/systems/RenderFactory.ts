import Phaser from 'phaser';

export const makeAttackSprite = (scene: Phaser.Scene, x: number, y: number, color: number): Phaser.GameObjects.Container => {
  const body = scene.add.ellipse(0, 0, 34, 24, color);
  const eye1 = scene.add.circle(-6, -3, 3, 0xffffff);
  const eye2 = scene.add.circle(6, -3, 3, 0xffffff);
  const horn1 = scene.add.triangle(-10, -11, 0, 9, 4, 0, 8, 9, 0xff9f1c);
  const horn2 = scene.add.triangle(10, -11, 0, 9, 4, 0, 8, 9, 0xff9f1c);
  const tail = scene.add.triangle(16, 3, 0, 0, 16, 4, 0, 8, color - 0x111111);
  return scene.add.container(x, y, [tail, body, eye1, eye2, horn1, horn2]);
};

export const makeDefenseSprite = (scene: Phaser.Scene, type: string, x: number, y: number): Phaser.GameObjects.Container => {
  if (type === 'crab') {
    return scene.add.container(x, y, [scene.add.ellipse(0, 0, 30, 22, 0x5a7d9a), scene.add.rectangle(-18, 0, 12, 6, 0x9ad1ff), scene.add.rectangle(18, 0, 12, 6, 0x9ad1ff)]);
  }
  if (type === 'laser') {
    return scene.add.container(x, y, [scene.add.circle(0, 0, 14, 0xa75dff), scene.add.circle(0, 0, 5, 0xffffff)]);
  }
  if (type === 'blob') {
    return scene.add.container(x, y, [scene.add.ellipse(0, 0, 32, 26, 0x57cc3f), scene.add.circle(-6, -3, 3, 0x9cf67b), scene.add.circle(6, 3, 2, 0x9cf67b)]);
  }
  return scene.add.container(x, y, [scene.add.ellipse(0, 0, 34, 24, 0xb85f34), scene.add.circle(-8, 2, 4, 0xfbe09c), scene.add.circle(0, -4, 4, 0xfbe09c), scene.add.circle(8, 3, 4, 0xfbe09c)]);
};

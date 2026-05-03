export type Point = { x: number; y: number };

export class PathSystem {
  mainPath: Point[];
  secondaryPath: Point[];
  spawnZone: { x: number; y: number; w: number; h: number };
  defenseSlots: Point[];
  corePoint: Point;

  constructor() {
    this.mainPath = [
      { x: 90, y: 220 }, { x: 240, y: 220 }, { x: 240, y: 130 }, { x: 420, y: 130 }, { x: 560, y: 220 }
    ];
    this.secondaryPath = [
      { x: 90, y: 315 }, { x: 220, y: 315 }, { x: 320, y: 255 }, { x: 460, y: 255 }, { x: 560, y: 220 }
    ];
    this.spawnZone = { x: 20, y: 170, w: 90, h: 190 };
    this.corePoint = { x: 600, y: 220 };
    this.defenseSlots = [
      { x: 185, y: 170 }, { x: 310, y: 180 }, { x: 380, y: 290 }, { x: 500, y: 175 }, { x: 470, y: 320 }
    ];
  }

  choosePath(seed: number): Point[] {
    return seed % 2 === 0 ? this.mainPath : this.secondaryPath;
  }
}

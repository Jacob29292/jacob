export type Team = 'attack' | 'defense';

export interface UnitStats {
  speed: number;
  hp: number;
  damage: number;
  range: number;
  cost: number;
}

export class KaijuUnit {
  id: string;
  name: string;
  team: Team;
  stats: UnitStats;
  hp: number;
  x: number;
  y: number;
  alive = true;
  attackCooldown = 0;
  slowFactor = 1;
  slowTimer = 0;
  targetPointIndex = 0;
  target?: KaijuUnit;

  constructor(id: string, name: string, team: Team, stats: UnitStats, x: number, y: number) {
    this.id = id;
    this.name = name;
    this.team = team;
    this.stats = stats;
    this.hp = stats.hp;
    this.x = x;
    this.y = y;
  }

  takeDamage(amount: number): void {
    this.hp -= amount;
    if (this.hp <= 0) {
      this.hp = 0;
      this.alive = false;
    }
  }

  applySlow(multiplier: number, durationMs: number): void {
    this.slowFactor = Math.min(this.slowFactor, multiplier);
    this.slowTimer = Math.max(this.slowTimer, durationMs);
  }

  tick(deltaMs: number): void {
    if (this.attackCooldown > 0) this.attackCooldown -= deltaMs;
    if (this.slowTimer > 0) {
      this.slowTimer -= deltaMs;
      if (this.slowTimer <= 0) this.slowFactor = 1;
    }
  }
}

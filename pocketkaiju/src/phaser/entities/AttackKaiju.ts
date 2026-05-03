import { KaijuUnit, type UnitStats } from './KaijuUnit';

export type AttackKaijuType = 'breaker' | 'sprinter' | 'tank' | 'acid';

export const ATTACK_KAIJU_STATS: Record<AttackKaijuType, UnitStats> = {
  breaker: { speed: 30, hp: 240, damage: 40, range: 22, cost: 40 },
  sprinter: { speed: 78, hp: 70, damage: 14, range: 16, cost: 20 },
  tank: { speed: 24, hp: 420, damage: 24, range: 18, cost: 55 },
  acid: { speed: 36, hp: 120, damage: 20, range: 95, cost: 45 }
};

const labels: Record<AttackKaijuType, string> = {
  breaker: 'Briseur',
  sprinter: 'Sprinter',
  tank: 'Tank',
  acid: 'Cracheur Acide'
};

export class AttackKaiju extends KaijuUnit {
  kaijuType: AttackKaijuType;

  constructor(id: string, type: AttackKaijuType, x: number, y: number) {
    super(id, labels[type], 'attack', ATTACK_KAIJU_STATS[type], x, y);
    this.kaijuType = type;
  }
}

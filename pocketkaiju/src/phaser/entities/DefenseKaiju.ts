import { KaijuUnit, type UnitStats } from './KaijuUnit';

export type DefenseKaijuType = 'crab' | 'laser' | 'blob' | 'nest';

export const DEFENSE_KAIJU_STATS: Record<DefenseKaijuType, UnitStats> = {
  crab: { speed: 0, hp: 260, damage: 26, range: 26, cost: 60 },
  laser: { speed: 0, hp: 130, damage: 22, range: 125, cost: 70 },
  blob: { speed: 0, hp: 160, damage: 5, range: 90, cost: 65 },
  nest: { speed: 0, hp: 200, damage: 0, range: 0, cost: 90 }
};

const labels: Record<DefenseKaijuType, string> = {
  crab: 'Crabe Blindé',
  laser: 'Œil Laser',
  blob: 'Blob Toxique',
  nest: 'Nid Mutant'
};

export class DefenseKaiju extends KaijuUnit {
  kaijuType: DefenseKaijuType;
  abilityCooldown = 0;

  constructor(id: string, type: DefenseKaijuType, x: number, y: number) {
    super(id, labels[type], 'defense', DEFENSE_KAIJU_STATS[type], x, y);
    this.kaijuType = type;
  }
}

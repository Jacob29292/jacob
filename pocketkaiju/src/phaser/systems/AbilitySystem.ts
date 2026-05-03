import { DefenseKaiju } from '../entities/DefenseKaiju';
import { KaijuUnit } from '../entities/KaijuUnit';

export class AbilitySystem {
  activate(defense: DefenseKaiju, attackers: KaijuUnit[]): string {
    if (defense.abilityCooldown > 0) return `${defense.name} pas prêt`;
    defense.abilityCooldown = 12000;

    if (defense.kaijuType === 'blob') {
      attackers.forEach((a) => {
        const d = Math.hypot(a.x - defense.x, a.y - defense.y);
        if (d <= 110) a.applySlow(0.55, 3000);
      });
      return 'Zone toxique activée';
    }

    if (defense.kaijuType === 'laser') {
      const target = attackers.find((a) => a.alive);
      target?.takeDamage(55);
      return 'Rayon surchargé';
    }

    if (defense.kaijuType === 'nest') return 'Nid muté: incubation accélérée';
    return 'Carapace renforcée';
  }

  tick(defenders: DefenseKaiju[], delta: number): void {
    defenders.forEach((d) => {
      if (d.abilityCooldown > 0) d.abilityCooldown -= delta;
    });
  }
}

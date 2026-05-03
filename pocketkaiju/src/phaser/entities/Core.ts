export class Core {
  maxHp = 1000;
  hp = 1000;

  damage(amount: number): void {
    this.hp = Math.max(0, this.hp - amount);
  }

  get alive(): boolean {
    return this.hp > 0;
  }
}

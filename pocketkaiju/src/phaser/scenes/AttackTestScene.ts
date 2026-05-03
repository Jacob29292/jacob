import Phaser from 'phaser';
import { AttackKaiju, type AttackKaijuType, ATTACK_KAIJU_STATS } from '../entities/AttackKaiju';
import { Core } from '../entities/Core';
import { DefenseKaiju } from '../entities/DefenseKaiju';
import { PathSystem } from '../systems/PathSystem';
import { formatTime } from '../systems/UI';

export class AttackTestScene extends Phaser.Scene {
  private attackers: AttackKaiju[] = [];
  private defenders: DefenseKaiju[] = [];
  private path = new PathSystem();
  private core = new Core();
  private energy = 60;
  private selected: AttackKaijuType = 'breaker';
  private timer = 120000;
  private kills = 0;
  private coreDamage = 0;
  private uiText!: Phaser.GameObjects.Text;

  constructor() { super('AttackTestScene'); }

  create(): void {
    this.drawMap();
    this.spawnEnemyDefenses();
    this.createBar();
    this.uiText = this.add.text(10, 10, '', { color: '#fff', fontSize: '16px' });
    this.updateUi();
  }
  update(_t:number, d:number): void {
    this.timer -= d; this.energy += d / 1000 * 9;
    this.attackers.forEach((a, idx) => this.moveAttacker(a, d, idx));
    this.autoCombat(d);
    this.attackers = this.attackers.filter((x) => x.alive);
    this.defenders = this.defenders.filter((x) => x.alive);
    this.updateUi();
    if (!this.core.alive || this.timer <= 0) this.endGame(!this.core.alive);
  }
  private drawMap(): void { /* simplified map */
    this.cameras.main.setBackgroundColor('#15232d');
    this.add.rectangle(320, 220, 640, 440, 0x183844);
    this.path.mainPath.forEach((p, i, arr) => i && this.add.line(0,0,arr[i-1].x,arr[i-1].y,p.x,p.y,0xf2d28b).setLineWidth(8));
    this.path.secondaryPath.forEach((p, i, arr) => i && this.add.line(0,0,arr[i-1].x,arr[i-1].y,p.x,p.y,0xa4f28b).setLineWidth(6));
    this.add.rectangle(this.path.spawnZone.x+45, this.path.spawnZone.y+95, 90,190,0x233355).setStrokeStyle(2,0xffffff).setInteractive().on('pointerdown',()=>this.spawnAttacker());
    this.add.text(25,180,'Spawn',{fontSize:'16px'});
    this.add.circle(this.path.corePoint.x, this.path.corePoint.y, 24, 0xff4d6d);
  }
  private createBar(): void { let x=90; (Object.keys(ATTACK_KAIJU_STATS) as AttackKaijuType[]).forEach((k)=>{ const b=this.add.rectangle(x,410,120,45,0x24336b).setInteractive(); this.add.text(x,410,k,{fontSize:'14px'}).setOrigin(0.5); b.on('pointerdown',()=>this.selected=k); x+=140;}); }
  private spawnEnemyDefenses(): void { this.path.defenseSlots.slice(0,4).forEach((p,i)=>{ const t=(['crab','laser','blob','nest'] as const)[i]; const d=new DefenseKaiju(`d${i}`,t,p.x,p.y); this.defenders.push(d); this.add.rectangle(p.x,p.y,24,24,0x4ce0b3); }); }
  private spawnAttacker(): void { const cost=ATTACK_KAIJU_STATS[this.selected].cost; if (this.energy<cost) return; this.energy-=cost; const a=new AttackKaiju(`a${Date.now()}`,this.selected,85,220); this.attackers.push(a); this.add.circle(a.x,a.y,10,0xffc857).setData('u',a); }
  private moveAttacker(a: AttackKaiju, d:number, idx:number): void { const path=this.path.choosePath(idx); const target=path[Math.min(a.targetPointIndex,path.length-1)]; const speed=(a.stats.speed*a.slowFactor)*d/1000; const dist=Math.hypot(target.x-a.x,target.y-a.y); if (dist<=speed){ a.x=target.x;a.y=target.y;a.targetPointIndex++; if (a.targetPointIndex>=path.length){ this.core.damage(a.stats.damage); this.coreDamage+=a.stats.damage; a.alive=false; }} else {a.x+=(target.x-a.x)/dist*speed;a.y+=(target.y-a.y)/dist*speed;} this.children.each((c:any)=>{ if(c.getData&&c.getData('u')===a){c.x=a.x;c.y=a.y;}}); }
  private autoCombat(delta:number): void { this.defenders.forEach((d)=>{ d.tick(delta); if(d.attackCooldown>0)return; const target=this.attackers.find((a)=>a.alive&&Math.hypot(a.x-d.x,a.y-d.y)<=d.stats.range); if(target){ target.takeDamage(d.stats.damage); d.attackCooldown=900; if(!target.alive) this.kills++; }}); }
  private updateUi(): void { this.uiText.setText(`Energie: ${Math.floor(this.energy)} | Coeur: ${this.core.hp}/1000 | Temps: ${formatTime(this.timer)} | Kills: ${this.kills}`); }
  private endGame(attackerWon:boolean): void { this.scene.start('CollectionScene',{ end:true, win:attackerWon, coreDamage:this.coreDamage, kills:this.kills, adn:Math.floor(this.coreDamage/4+this.kills*3), from:'Attack' }); }
}

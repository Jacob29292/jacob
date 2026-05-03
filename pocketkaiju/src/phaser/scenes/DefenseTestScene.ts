import Phaser from 'phaser';
import { AttackKaiju } from '../entities/AttackKaiju';
import { Core } from '../entities/Core';
import { DefenseKaiju, type DefenseKaijuType, DEFENSE_KAIJU_STATS } from '../entities/DefenseKaiju';
import { AbilitySystem } from '../systems/AbilitySystem';
import { PathSystem } from '../systems/PathSystem';
import { formatTime } from '../systems/UI';

export class DefenseTestScene extends Phaser.Scene {
  private path = new PathSystem(); private core = new Core(); private ability = new AbilitySystem();
  private attackers: AttackKaiju[]=[]; private defenders: DefenseKaiju[]=[];
  private budget=220; private timer=120000; private selected:DefenseKaijuType='crab'; private kills=0; private dmg=0; private txt!:Phaser.GameObjects.Text;
  constructor(){super('DefenseTestScene');}
  create(): void { this.draw(); this.toolbar(); this.txt=this.add.text(10,10,'',{fontSize:'16px'}); this.time.addEvent({delay:2500,loop:true,callback:()=>this.spawnWave()}); this.updateUi(); }
  update(_t:number,d:number):void{ this.timer-=d; this.ability.tick(this.defenders,d); this.attackers.forEach((a,i)=>this.move(a,d,i)); this.autoFight(d); this.attackers=this.attackers.filter(a=>a.alive); this.updateUi(); if(!this.core.alive||this.timer<=0)this.end(this.timer>0?false:true); }
  private draw(){ this.cameras.main.setBackgroundColor('#202030'); this.add.rectangle(320,220,640,440,0x22303a); this.path.defenseSlots.forEach((p,idx)=>this.add.rectangle(p.x,p.y,30,30,0x37556f).setStrokeStyle(1,0xffffff).setInteractive().on('pointerdown',()=>this.place(idx))); this.path.mainPath.forEach((p,i,a)=>i&&this.add.line(0,0,a[i-1].x,a[i-1].y,p.x,p.y,0xe5aa77).setLineWidth(8)); this.path.secondaryPath.forEach((p,i,a)=>i&&this.add.line(0,0,a[i-1].x,a[i-1].y,p.x,p.y,0x77e5aa).setLineWidth(6)); this.add.circle(this.path.corePoint.x,this.path.corePoint.y,24,0xff4d6d); }
  private toolbar(){ let x=85; (Object.keys(DEFENSE_KAIJU_STATS) as DefenseKaijuType[]).forEach((k)=>{ const b=this.add.rectangle(x,410,120,42,0x2f457e).setInteractive(); this.add.text(x,410,k,{fontSize:'14px'}).setOrigin(0.5); b.on('pointerdown',()=>this.selected=k); x+=140;}); this.input.keyboard?.on('keydown-SPACE',()=>{ const d=this.defenders[0]; if(!d) return; this.add.text(220,20,this.ability.activate(d,this.attackers),{fontSize:'14px',color:'#bff'}).setDepth(10).setScrollFactor(0);}); }
  private place(slot:number){ const p=this.path.defenseSlots[slot]; if(this.defenders.some(d=>d.x===p.x&&d.y===p.y))return; const cost=DEFENSE_KAIJU_STATS[this.selected].cost; if(this.budget<cost)return; this.budget-=cost; const d=new DefenseKaiju(`d${slot}${Date.now()}`,this.selected,p.x,p.y); this.defenders.push(d); this.add.rectangle(p.x,p.y,24,24,0x63ffd1).setData('u',d); }
  private spawnWave(){ const kind=(['breaker','sprinter','tank','acid'] as const)[Math.floor(Math.random()*4)]; const a=new AttackKaiju(`w${Date.now()}`,kind,85,220); this.attackers.push(a); this.add.circle(a.x,a.y,9,0xffbe0b).setData('u',a); }
  private move(a:AttackKaiju,d:number,i:number){ const path=this.path.choosePath(i); const t=path[Math.min(a.targetPointIndex,path.length-1)]; const s=(a.stats.speed*a.slowFactor)*d/1000; const di=Math.hypot(t.x-a.x,t.y-a.y); if(di<=s){ a.x=t.x;a.y=t.y;a.targetPointIndex++; if(a.targetPointIndex>=path.length){ this.core.damage(a.stats.damage); this.dmg+=a.stats.damage; a.alive=false; }} else {a.x+=(t.x-a.x)/di*s; a.y+=(t.y-a.y)/di*s;} this.children.each((c:any)=>{if(c.getData&&c.getData('u')===a){c.x=a.x;c.y=a.y;}}); }
  private autoFight(delta:number){ this.defenders.forEach((d)=>{ d.tick(delta); if(d.attackCooldown>0)return; const t=this.attackers.find((a)=>a.alive&&Math.hypot(a.x-d.x,a.y-d.y)<=d.stats.range); if(t){ t.takeDamage(d.stats.damage); d.attackCooldown=850; if(d.kaijuType==='blob') t.applySlow(0.7,1500); if(!t.alive) this.kills++; }}); }
  private updateUi(){ this.txt.setText(`Budget: ${this.budget} | Coeur: ${this.core.hp}/1000 | Temps: ${formatTime(this.timer)} | Dmg coeur: ${this.dmg}`); }
  private end(defWin:boolean){ this.scene.start('CollectionScene',{ end:true, win:defWin, coreDamage:this.dmg, kills:this.kills, adn:Math.floor(this.kills*5+(defWin?80:20)), from:'Defense' }); }
}

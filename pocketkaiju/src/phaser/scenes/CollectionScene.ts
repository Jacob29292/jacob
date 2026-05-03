import Phaser from 'phaser';
import { ATTACK_KAIJU_STATS } from '../entities/AttackKaiju';
import { DEFENSE_KAIJU_STATS } from '../entities/DefenseKaiju';

export class CollectionScene extends Phaser.Scene {
  constructor(){super('CollectionScene');}
  create(data?: any): void {
    this.cameras.main.setBackgroundColor('#111827');
    this.add.text(320,35,'Collection', {fontSize:'34px', color:'#8bf2ff'}).setOrigin(0.5);
    if (data?.end) {
      this.add.text(320,80, `${data.from} Test - ${data.win ? 'Victoire' : 'Défaite'}`, {fontSize:'22px', color:'#fff'}).setOrigin(0.5);
      this.add.text(320,110, `Dégâts Cœur: ${data.coreDamage} | Kaijus éliminés: ${data.kills} | ADN: ${data.adn}`, {fontSize:'16px'}).setOrigin(0.5);
      this.btn(320,140,'Rejouer',()=>this.scene.start(data.from==='Attack'?'AttackTestScene':'DefenseTestScene'));
    }
    let y=180;
    this.add.text(60,y-30,'Attaque',{fontSize:'22px'});
    Object.entries(ATTACK_KAIJU_STATS).forEach(([k,v])=>{ this.add.text(60,y,`${k} | SPD ${v.speed} HP ${v.hp} DMG ${v.damage} RNG ${v.range} C ${v.cost}`,{fontSize:'14px'}); y+=24; });
    y+=15; this.add.text(60,y-5,'Défense',{fontSize:'22px'}); y+=25;
    Object.entries(DEFENSE_KAIJU_STATS).forEach(([k,v])=>{ this.add.text(60,y,`${k} | HP ${v.hp} DMG ${v.damage} RNG ${v.range} C ${v.cost}`,{fontSize:'14px'}); y+=24; });
    this.btn(560,400,'Menu',()=>this.scene.start('MenuScene'));
  }
  private btn(x:number,y:number,l:string,cb:()=>void){ this.add.rectangle(x,y,120,36,0x2d3f80).setInteractive().on('pointerdown',cb); this.add.text(x,y,l,{fontSize:'16px'}).setOrigin(0.5); }
}

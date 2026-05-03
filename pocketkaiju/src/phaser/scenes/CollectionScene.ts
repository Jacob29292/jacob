import Phaser from 'phaser';
import { ATTACK_KAIJU_STATS } from '../entities/AttackKaiju';
import { DEFENSE_KAIJU_STATS } from '../entities/DefenseKaiju';

export class CollectionScene extends Phaser.Scene {
  create(data?:any){ this.cameras.main.fadeIn(250); this.cameras.main.setBackgroundColor('#111827');
    if(data?.end){ this.add.text(600,120,data.win?'VICTOIRE':'DÉFAITE',{fontSize:'68px',color:data.win?'#74f08a':'#ff6b6b'}).setOrigin(0.5);
      this.add.text(600,210,`Dégâts Cœur: ${data.coreDamage}   Kaijus éliminés: ${data.kills}   ADN: ${data.adn}`,{fontSize:'28px'}).setOrigin(0.5);
      this.btn(470,290,'Rejouer',()=>this.scene.start(data.from==='Attack'?'AttackTestScene':'DefenseTestScene'));
      this.btn(730,290,'Retour Menu',()=>this.scene.start('MenuScene'));
    }
    this.add.text(120,360,'Collection Kaijus',{fontSize:'36px',color:'#8bf2ff'});
    let y=410; Object.entries(ATTACK_KAIJU_STATS).forEach(([k,v])=>{ this.add.text(120,y,`${k} | SPD ${v.speed} HP ${v.hp} DMG ${v.damage} RNG ${v.range} COST ${v.cost}`,{fontSize:'22px'}); y+=34; });
    y+=20; Object.entries(DEFENSE_KAIJU_STATS).forEach(([k,v])=>{ this.add.text(120,y,`${k} | HP ${v.hp} DMG ${v.damage} RNG ${v.range} COST ${v.cost}`,{fontSize:'22px'}); y+=34; });
    if(!data?.end) this.btn(1040,650,'Menu',()=>this.scene.start('MenuScene'));
  }
  private btn(x:number,y:number,l:string,cb:()=>void){ const r=this.add.rectangle(x,y,210,58,0x2d3f80).setStrokeStyle(2,0xa3d9ff).setInteractive(); this.add.text(x,y,l,{fontSize:'26px'}).setOrigin(0.5); r.on('pointerdown',()=>{this.cameras.main.fadeOut(150); this.time.delayedCall(150,cb);}); }
}

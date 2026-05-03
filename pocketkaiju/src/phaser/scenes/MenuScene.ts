import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  create(){ this.cameras.main.fadeIn(250); this.cameras.main.setBackgroundColor('#0f1226'); this.add.text(600,120,'Kaiju Core Wars',{fontSize:'72px',color:'#8bf2ff'}).setOrigin(0.5); this.add.text(600,180,'Playable Prototype',{fontSize:'30px'}).setOrigin(0.5);
    this.button(600,310,'Play Attack Test',()=>this.go('AttackTestScene'));
    this.button(600,400,'Play Defense Test',()=>this.go('DefenseTestScene'));
    this.button(600,490,'Collection',()=>this.go('CollectionScene'));
  }
  private go(k:string){ this.cameras.main.fadeOut(180); this.time.delayedCall(180,()=>this.scene.start(k)); }
  private button(x:number,y:number,l:string,cb:()=>void){ const r=this.add.rectangle(x,y,400,70,0x2d3f80).setStrokeStyle(3,0x8bf2ff).setInteractive(); this.add.text(x,y,l,{fontSize:'34px'}).setOrigin(0.5); r.on('pointerdown',cb); }
}

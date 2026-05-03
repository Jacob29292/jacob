import { Howl } from 'howler';
const mk=(src:string)=>new Howl({src:[src],volume:.5});
export const sfx={hit:mk('/src/assets/sounds/hit.mp3'),victory:mk('/src/assets/sounds/victory.mp3'),crack:mk('/src/assets/sounds/crack.mp3'),common:mk('/src/assets/sounds/common.mp3'),rare:mk('/src/assets/sounds/rare.mp3'),epic:mk('/src/assets/sounds/epic.mp3'),mythic:mk('/src/assets/sounds/mythic.mp3')};
export const safePlay=(k:keyof typeof sfx)=>{try{sfx[k].play();}catch{}}

import { Actor } from './actor';
import { Class } from './class';
import { Equipment } from './equipment';

export class Hero extends Actor {
  class: Class;
  classInfo: Class[];

  exp: number = 0;
  expNextLvl: number = 300;
  percentageToLvl: number = 0;

  inParty: boolean;

  updateExp(xp:number):void {
    console.log('updating exp');
    this.exp += xp;
    console.log(this.exp+'/'+this.expNextLvl);
    if (this.exp >= this.expNextLvl) {
      console.log('Dun dun dun dun dun dun DUN DUN DUNNNNNN!!!! ' + this.name + ' got a level up!');
      this.lvl++;
      this.expNextLvl += Math.ceil(this.expNextLvl * 1.75);
      this.percentageToLvl = 0;
      return;
    } else {
      var baseExpForLvl;
      if (this.lvl > 1) {
        baseExpForLvl = this.calcBaseExp(this.lvl);
      } else {
        baseExpForLvl = 0;
      }
      
      var expNeeded = this.expNextLvl - baseExpForLvl;
      var expGainedToLvl = this.exp - baseExpForLvl;

      this.percentageToLvl = Math.floor((expGainedToLvl/expNeeded) * 100);
    }
  }

  calcBaseExp(lvl: number): number {
     var xp = 300;

     for (var i=0;i<lvl-2;i++) {
       xp += Math.ceil(xp * 1.75);
     }

     return xp;
  }
}
import { Action } from './action';

export class Actor {
    id: number;
    name: string = '';;
    type: string = '';

    lvl: number = 0;
    hp: number = 0;
    maxHp: number = 0;

    mp: number = 0;
    maxMp: number = 0;

    ct: number = 2000;
    baseCt: number = 2000;

    str: number = 0;
    vit: number = 0;
    int: number = 0;
    wis: number = 0;
    dex: number = 0;
    cha: number = 0;
    luk: number = 0;

    action: Action;
    actions: Action[] = [];

    target: Actor;

    isAlive: boolean = false;
    isVisible: boolean = false;

    constructor(
        id: number,
        name: string,
        type: string = 'human',
        lvl: number = 1,
        str: number = 10,
        vit: number = 10,
        int: number = 10,
        wis: number = 10,
        dex: number = 10,
        cha: number = 10,
        luk: number = 10
    ) {
        this.id = id; this.name = name; this.type = type; this.lvl = lvl;  
        this.ct = 0; this.baseCt = 2000;

        this.str = str; this.vit = vit; this.int = int;
        this.wis = wis; this.dex = dex; this.cha = cha; this.luk = luk;
            
        this.isAlive = true; this.isVisible = true;

        this.hp =  100 + Math.floor((this.vit * 2) + (this.str * 1.5) + (this.luk * .5));
        this.maxHp = this.hp;

        this.mp = 30 + Math.floor((this.int * 1.5) + this.wis + (this.luk * .25));
        this.maxMp = this.mp;

        this.ct = 2000; this.baseCt = 2000;

        var dagger = new Action(0, 'Dagger', 'attack', 'steel', 'str', 1, 6, 'bleed', 2);
        this.actions.push(dagger);
    }

    chooseAction(): void {
        console.log('choosing action...');
        this.action = this.actions[
            Math.floor(Math.random() * this.actions.length)
        ]
    }

    chooseTarget(targets: Actor[]): void {
        this.target = targets[
            Math.floor(Math.random() * targets.length)
        ]
    }
}
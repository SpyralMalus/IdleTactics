export class Action {
    id: number;
    name: string;

    type: string;
    element: string;
    stat: string;

    numDice: number;
    diceType: number;

    effect: string;
    effectChance: number;

    constructor (
        id: number, name: string,
        type: string, element: string, stat: string,
        numDice: number, diceType: number,
        effect:string, effectChance: number
    ) {
        this.id = id; this.name = name;
        this.type = type; this.element = element; this.stat = stat;
        this.numDice = numDice; this.diceType = diceType;
        this.effect = effect; this.effectChance = effectChance;
    }
}
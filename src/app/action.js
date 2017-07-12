"use strict";
var Action = (function () {
    function Action(id, name, type, element, stat, numDice, diceType, effect, effectChance) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.element = element;
        this.stat = stat;
        this.numDice = numDice;
        this.diceType = diceType;
        this.effect = effect;
        this.effectChance = effectChance;
    }
    return Action;
}());
exports.Action = Action;
//# sourceMappingURL=action.js.map
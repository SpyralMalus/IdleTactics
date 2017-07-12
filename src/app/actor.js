"use strict";
var action_1 = require("./action");
var Actor = (function () {
    function Actor(id, name, type, lvl, str, vit, int, wis, dex, cha, luk) {
        if (type === void 0) { type = 'human'; }
        if (lvl === void 0) { lvl = 1; }
        if (str === void 0) { str = 10; }
        if (vit === void 0) { vit = 10; }
        if (int === void 0) { int = 10; }
        if (wis === void 0) { wis = 10; }
        if (dex === void 0) { dex = 10; }
        if (cha === void 0) { cha = 10; }
        if (luk === void 0) { luk = 10; }
        this.name = '';
        this.type = '';
        this.lvl = 0;
        this.hp = 0;
        this.maxHp = 0;
        this.mp = 0;
        this.maxMp = 0;
        this.ct = 2000;
        this.baseCt = 2000;
        this.str = 0;
        this.vit = 0;
        this.int = 0;
        this.wis = 0;
        this.dex = 0;
        this.cha = 0;
        this.luk = 0;
        this.actions = [];
        this.isAlive = false;
        this.isVisible = false;
        this.id = id;
        this.name = name;
        this.type = type;
        this.lvl = lvl;
        this.ct = 0;
        this.baseCt = 2000;
        this.str = str;
        this.vit = vit;
        this.int = int;
        this.wis = wis;
        this.dex = dex;
        this.cha = cha;
        this.luk = luk;
        this.isAlive = true;
        this.isVisible = true;
        this.hp = 100 + Math.floor((this.vit * 2) + (this.str * 1.5) + (this.luk * .5));
        this.maxHp = this.hp;
        this.mp = 30 + Math.floor((this.int * 1.5) + this.wis + (this.luk * .25));
        this.maxMp = this.mp;
        this.ct = 2000;
        this.baseCt = 2000;
        var dagger = new action_1.Action(0, 'Dagger', 'attack', 'steel', 'str', 1, 6, 'bleed', 2);
        this.actions.push(dagger);
    }
    ;
    Actor.prototype.chooseAction = function () {
        console.log('choosing action...');
        this.action = this.actions[Math.floor(Math.random() * this.actions.length)];
    };
    Actor.prototype.chooseTarget = function (targets) {
        this.target = targets[Math.floor(Math.random() * targets.length)];
    };
    return Actor;
}());
exports.Actor = Actor;
//# sourceMappingURL=actor.js.map
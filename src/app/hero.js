"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var actor_1 = require("./actor");
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.exp = 0;
        _this.expNextLvl = 300;
        _this.percentageToLvl = 0;
        return _this;
    }
    Hero.prototype.updateExp = function (xp) {
        console.log('updating exp');
        this.exp += xp;
        console.log(this.exp + '/' + this.expNextLvl);
        if (this.exp >= this.expNextLvl) {
            console.log('Dun dun dun dun dun dun DUN DUN DUNNNNNN!!!! ' + this.name + ' got a level up!');
            this.lvl++;
            this.expNextLvl += Math.ceil(this.expNextLvl * 1.75);
            this.percentageToLvl = 0;
            return;
        }
        else {
            var baseExpForLvl;
            if (this.lvl > 1) {
                baseExpForLvl = this.calcBaseExp(this.lvl);
            }
            else {
                baseExpForLvl = 0;
            }
            var expNeeded = this.expNextLvl - baseExpForLvl;
            var expGainedToLvl = this.exp - baseExpForLvl;
            this.percentageToLvl = Math.floor((expGainedToLvl / expNeeded) * 100);
        }
    };
    Hero.prototype.calcBaseExp = function (lvl) {
        var xp = 300;
        for (var i = 0; i < lvl - 2; i++) {
            xp += Math.ceil(xp * 1.75);
        }
        return xp;
    };
    return Hero;
}(actor_1.Actor));
exports.Hero = Hero;
//# sourceMappingURL=hero.js.map
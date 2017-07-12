"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var hero_1 = require("./hero");
var hero_service_1 = require("./hero.service");
var location_service_1 = require("./location.service");
var enemy_1 = require("./enemy");
var DashboardComponent = (function () {
    function DashboardComponent(heroService, locationService) {
        this.heroService = heroService;
        this.locationService = locationService;
        this.heroes = [];
        this.openLocations = [];
        this.progress = 0;
        this.gold = 0;
        this.items = [];
        this.dots = '';
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('onInit');
        this.heroService.getHeroes().then(function (heroes) {
            _this.heroes = heroes.filter(function (hero) { return hero.inParty === true; });
            //console.log(this.heroes);
            for (var i = 0; i < _this.heroes.length; i++) {
                var ally = _this.heroes[i];
                _this.heroes[i] = new hero_1.Hero(1, ally.name, ally.type, ally.lvl, _this.heroService.roll4D6Drop1(), _this.heroService.roll4D6Drop1(), _this.heroService.roll4D6Drop1(), _this.heroService.roll4D6Drop1(), _this.heroService.roll4D6Drop1(), _this.heroService.roll4D6Drop1(), _this.heroService.roll4D6Drop1());
                console.log('new hero ' + _this.heroes[i].name);
                console.log(_this.heroes[i]);
            }
            _this.locationService.getLocations().then(function (locations) {
                _this.openLocations = locations.filter(function (location) { return location.isUnlocked === true; });
                console.log(_this.openLocations);
                _this.location = _this.openLocations[Math.floor(Math.random() * _this.openLocations.length)];
                console.log(_this.location.name);
                _this.activity = _this.location.activities[Math.floor(Math.random() * _this.location.activities.length)];
                console.log(_this.activity.name);
                console.log(_this.heroes);
                //console.log(this.location.name);
                //console.log(this.activity.name);
                _this.adventureTime(_this.heroes, _this.activity);
            });
        });
        console.log(this.heroes);
    };
    DashboardComponent.prototype.adventureTime = function (party, act) {
        //console.log(party.length);
        //console.log(act);
        //if (party.length > 0) {
        switch (act.type) {
            case 'battle': {
                console.log('act.type = battle');
                this.doBattle(party, act);
                console.log('battle activity complete');
                break;
            }
            case 'survival': {
                console.log('act.type = survival');
                //this.doSurvival(party,act);
                break;
            }
            case 'npc': {
                console.log('act.type = npc');
                //this.talkToNpc(party,act);
                break;
            }
            case 'passive': {
                console.log('act.type = passive');
                //this.bePassive(party,act);
                break;
            }
            default: {
                console.log('act.type = default');
                //this.doEncounter(party,act);
                break;
            }
        }
    };
    DashboardComponent.prototype.updateProgress = function (amount) {
        console.log('update by - ' + amount);
        this.progress += amount;
        this.dots += '.';
        if (this.dots.length > 3) {
            this.dots = '';
        }
        if (this.progress >= 100) {
            this.gold++;
            this.progress = 0;
            this.activity = this.location.activities[Math.floor(Math.random() * this.location.activities.length)];
        }
    };
    DashboardComponent.prototype.doBattle = function (party, act) {
        var _this = this;
        console.log('doBattle');
        for (var i = 0; i < party.length; i++) {
            party[i].ct = party[i].baseCt;
        }
        for (var i = 0; i < act.enemies.length; i++) {
            var enemy = act.enemies[i];
            act.enemies[i] = new enemy_1.Enemy(i, enemy.name, enemy.type, enemy.lvl, enemy.str, enemy.vit, enemy.int, enemy.wis, enemy.dex, enemy.cha, enemy.luk);
            act.enemies[i].actions = enemy.actions;
            act.enemies[i].reward = enemy.reward;
            act.enemies[i].difficulty = enemy.difficulty;
            act.enemies[i].isAlive = true;
            act.enemies[i].isVisible = true;
            act.enemies[i].ct = act.enemies[i].baseCt;
            console.log(act.enemies[i].reward);
        }
        console.log('enter battle loop');
        var battleLoop = setInterval(function () {
            if (_this.checkAlive(party) && _this.checkAlive(act.enemies)) {
                _this.updateBattle(party, act.enemies);
            }
            else {
                console.log('party is alive: ' + _this.checkAlive(party));
                console.log('enemies are alive: ' + _this.checkAlive(act.enemies));
                console.log('breaking battle loop');
                if (_this.checkAlive(party)) {
                    console.log('All enemies defeated, you win!');
                    act.enemies.forEach(function (enemy) {
                        console.log(enemy.reward);
                        var g = enemy.reward.gold;
                        _this.gold += g;
                        console.log('you get ' + g + ' Gold!');
                        var drop = enemy.reward.items[0];
                        _this.items.push(drop);
                        console.log('You found..');
                        console.log(drop);
                        console.log(enemy);
                        var xp = Math.ceil(((enemy.lvl * 7) + (enemy.difficulty * 3) + enemy.reward.bonusExp) / party.length);
                        console.log('Each hero gets ' + xp + " EXP!");
                        party.forEach(function (hero) {
                            hero.updateExp(xp);
                        });
                    });
                    _this.activity = _this.location.activities[Math.floor(Math.random() * _this.location.activities.length)];
                    console.log('new activity is...' + _this.activity.name);
                    _this.adventureTime(party, _this.activity);
                }
                else {
                    console.log('Party wiped out... you lose...');
                }
                clearInterval(battleLoop);
            }
        }, 16.67);
    };
    DashboardComponent.prototype.updateBattle = function (party, enemies) {
        //console.log('--------update Heros--------');
        this.updateBattleSide(party, enemies);
        //console.log('--------update Enemies--------');
        this.updateBattleSide(enemies, party);
    };
    DashboardComponent.prototype.updateBattleSide = function (thisTeam, thatTeam) {
        //console.log(thisTeam);
        for (var i = 0; i < thisTeam.length; i++) {
            thisTeam[i].ct -= thisTeam[i].dex;
            if (thisTeam[i].ct <= 0) {
                console.log(thisTeam[i].name + "'s turn...");
                var validTarget = false;
                thisTeam[i].chooseAction();
                switch (thisTeam[i].action.type) {
                    case 'attack': {
                        thisTeam[i].chooseTarget(thatTeam);
                        //TODO Check if target is valid
                        validTarget = true;
                        console.log('targeting ' + thisTeam[i].target.name);
                        this.attackTarget(thisTeam[i], thisTeam[i].target);
                        break;
                    }
                    default: {
                        console.log('no case for this action type');
                        break;
                    }
                }
                thisTeam[i].ct = thisTeam[i].baseCt;
            }
        }
    };
    DashboardComponent.prototype.attackTarget = function (actor, target) {
        console.log(actor.name + ' attacks ' + target.name + ' using ' + actor.action.name);
        var critical = false;
        var attackRoll = this.heroService.roll(1, 20);
        //console.log('attackRoll: ' + attackRoll);
        if (attackRoll == 20) {
            console.log('Critical Hit!');
            critical = true;
        }
        var damageMod = this.getMod(actor, actor.action.stat);
        var attackMod = damageMod + Math.ceil(actor.lvl / 4);
        var totalAttack = attackRoll + attackMod;
        //console.log('attackMod: ' + attackMod);
        //console.log('total Attack: ' + totalAttack)
        var targetDodge = this.getMod(target, 'dex') + Math.floor(this.getMod(target, 'luk') / 3);
        console.log(totalAttack + ' vs ' + targetDodge);
        if (critical || totalAttack > targetDodge) {
            var allDamage = 0;
            var damageRoll = 0;
            var critDamage = 0;
            console.log('successful hit');
            damageRoll += this.heroService.roll(actor.action.numDice, actor.action.diceType);
            //console.log('damageRoll: ' + damageRoll);
            if (critical) {
                critDamage += this.heroService.roll(actor.action.numDice, actor.action.diceType);
            }
            //console.log('damageMod: '+ damageMod);
            allDamage = damageRoll + critDamage + damageMod;
            var targetDefMod;
            switch (actor.action.type) {
                case 'attack': {
                    targetDefMod = this.getMod(target, 'vit');
                    break;
                }
                case 'magic': {
                    targetDefMod = this.getMod(target, 'wis');
                    break;
                }
                case 'grapple': {
                    targetDefMod = this.getMod(target, 'str');
                    break;
                }
                case 'speak': {
                    targetDefMod = this.getMod(target, 'cha');
                    break;
                }
                case 'speed': {
                    targetDefMod = this.getMod(target, 'dex');
                    break;
                }
                case 'pyschic': {
                    targetDefMod = this.getMod(target, 'int');
                    break;
                }
                case 'chance': {
                    targetDefMod = this.getMod(target, 'luk');
                    break;
                }
                default: {
                    console.log('There is no stat associated with this action, falling back to vit');
                    targetDefMod = this.getMod(target, 'vit');
                    break;
                }
            }
            //console.log('targetDefMod: ' + targetDefMod);
            var finalDamage = allDamage - targetDefMod;
            if (finalDamage < 0)
                finalDamage = 0;
            console.log('finalDamage : ' + finalDamage);
            target.hp -= finalDamage;
            if (target.hp <= 0) {
                console.log(target.name + ' is dead!');
                target.hp = 0;
                target.mp = 0;
                target.ct = 0;
                target.isAlive = false;
            }
        }
    };
    DashboardComponent.prototype.getMod = function (actor, stat) {
        var statVal;
        switch (stat) {
            case 'str': {
                statVal = actor.str;
                break;
            }
            case 'vit': {
                statVal = actor.vit;
                break;
            }
            case 'int': {
                statVal = actor.int;
                break;
            }
            case 'wis': {
                statVal = actor.wis;
                break;
            }
            case 'dex': {
                statVal = actor.dex;
                break;
            }
            case 'cha': {
                statVal = actor.cha;
                break;
            }
            case 'luk': {
                statVal = actor.luk;
                break;
            }
        }
        return Math.floor(statVal / 5);
    };
    DashboardComponent.prototype.checkAlive = function (team) {
        for (var i = 0; i < team.length; i++) {
            if (team[i].isAlive)
                return true;
        }
        return false;
    };
    DashboardComponent.prototype.doSurvival = function (party, act) {
        console.log('doSurvival');
    };
    DashboardComponent.prototype.talkToNpc = function (party, act) {
        console.log('talkToNpc');
    };
    DashboardComponent.prototype.bePassive = function (party, act) {
        console.log('bePassive');
    };
    DashboardComponent.prototype.doEncounter = function (party, act) {
        console.log('doEncounter');
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'my-dashboard',
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.css']
    }),
    __metadata("design:paramtypes", [hero_service_1.HeroService,
        location_service_1.LocationService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map
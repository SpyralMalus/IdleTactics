import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Location } from './location';
import { LocationService } from './location.service';
import { Activity } from './activity';
import { Actor } from './actor';
import { Enemy } from './enemy';
import { Item } from './item';

@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];
    openLocations: Location[] = [];
    location: Location;
    activity: Activity;
    progress: number = 0;
    gold: number = 0;
    items: Item[] = [];
    dots: string = '';
    constructor(
        private heroService: HeroService,
        private locationService: LocationService
    ) { }

    ngOnInit(): void {
        console.log('onInit');
        this.heroService.getHeroes().then(heroes => {
            this.heroes = heroes.filter(hero => hero.inParty === true);
            //console.log(this.heroes);

            for (var i=0; i<this.heroes.length; i++) {
                var ally = this.heroes[i];

                this.heroes[i] = new Hero(1,ally.name, ally.type, ally.lvl, this.heroService.roll4D6Drop1(),
                this.heroService.roll4D6Drop1(), this.heroService.roll4D6Drop1(), this.heroService.roll4D6Drop1(),
                this.heroService.roll4D6Drop1(), this.heroService.roll4D6Drop1(), this.heroService.roll4D6Drop1());
                console.log('new hero ' + this.heroes[i].name);
                console.log(this.heroes[i]);
            }

            this.locationService.getLocations().then(locations => {
                this.openLocations = locations.filter(
                    location => location.isUnlocked === true
                );
                console.log(this.openLocations);

                this.location = this.openLocations[
                    Math.floor(Math.random() * this.openLocations.length)
                ];
                console.log(this.location.name);

                this.activity = this.location.activities[
                    Math.floor(Math.random() * this.location.activities.length)
                ];
                console.log(this.activity.name);

                console.log(this.heroes);
                //console.log(this.location.name);
                //console.log(this.activity.name);
                this.adventureTime(this.heroes, this.activity);
            });

        });
        console.log(this.heroes);


    }

    adventureTime(party: Hero[], act: Activity): void {
        //console.log(party.length);
        //console.log(act);
            //if (party.length > 0) {
            switch(act.type) {
                case'battle': {
                    console.log('act.type = battle');

                    this.doBattle(party,act);
                    console.log('battle activity complete');
                    break;
                }
                case'survival': {
                    console.log('act.type = survival');
                    //this.doSurvival(party,act);
                    break;
                }
                case'npc': {
                    console.log('act.type = npc');
                    //this.talkToNpc(party,act);
                    break;
                }
                case'passive': {
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
        
    }

    updateProgress(amount: number): void {
        console.log('update by - ' + amount);
        this.progress += amount;

        this.dots += '.';
        if (this.dots.length > 3) {
            this.dots = '';
        } 

        if (this.progress >= 100) {
            this.gold++;
            this.progress = 0;

            this.activity = this.location.activities[
                Math.floor(Math.random() * this.location.activities.length)
            ];
            //console.log('new activity = ' + this.activity.name);
        }
    }

    doBattle(party: Hero[], act: Activity): void {
        console.log('doBattle');
        for (var i =0; i < party.length; i++) {
            party[i].ct = party[i].baseCt;
        }

        for (var i=0; i<act.enemies.length; i++) {
            var enemy = act.enemies[i];

            act.enemies[i] = new Enemy(i, enemy.name, enemy.type, enemy.lvl,
                enemy.str, enemy.vit, enemy.int, enemy.wis, enemy.dex, enemy.cha, enemy.luk
            );
   
            act.enemies[i].actions = enemy.actions;
            act.enemies[i].reward = enemy.reward;
            act.enemies[i].difficulty = enemy.difficulty;
            act.enemies[i].isAlive = true;
            act.enemies[i].isVisible = true;
            act.enemies[i].ct = act.enemies[i].baseCt;
            console.log(act.enemies[i].reward);
        }
        console.log('enter battle loop');
        var battleLoop = setInterval(() => {
            if (this.checkAlive(party) && this.checkAlive(act.enemies)) {
                this.updateBattle(party, act.enemies);
            } else {
                console.log('party is alive: ' + this.checkAlive(party));
                console.log('enemies are alive: ' + this.checkAlive(act.enemies));
                console.log('breaking battle loop');
      
                if (this.checkAlive(party)) {
                    console.log('All enemies defeated, you win!');
                    act.enemies.forEach(enemy => {
                        console.log(enemy.reward);
                        var g = enemy.reward.gold;
                        this.gold += g;
                        console.log('you get ' + g + ' Gold!');

                        var drop = enemy.reward.items[0];
                        this.items.push(drop);
                        console.log('You found..');
                        console.log(drop);
                        console.log(enemy);
                        var xp = Math.ceil(((enemy.lvl * 7) + (enemy.difficulty * 3) + enemy.reward.bonusExp)/party.length);
                        console.log('Each hero gets ' + xp + " EXP!");
                        party.forEach(hero => {
                            hero.updateExp(xp);
                        })
                    });

                    this.activity = this.location.activities[
                        Math.floor(Math.random() * this.location.activities.length)
                    ];
                    console.log('new activity is...' + this.activity.name);
                    this.adventureTime(party, this.activity);     
                } else {
                    console.log('Party wiped out... you lose...');
                }
                clearInterval(battleLoop);
            } 
        }, 16.67);
    }


    updateBattle(party: Actor[], enemies: Actor[]) {
        //console.log('--------update Heros--------');
        this.updateBattleSide(party, enemies);
        //console.log('--------update Enemies--------');
        this.updateBattleSide(enemies, party);
    }

    updateBattleSide(thisTeam: Actor[], thatTeam: Actor[]): void {
        //console.log(thisTeam);
        for (var i =0; i<thisTeam.length;i++) {
            thisTeam[i].ct -= thisTeam[i].dex;
            if (thisTeam[i].ct <= 0) {
                console.log(thisTeam[i].name + "'s turn...");
                var validTarget = false;

                thisTeam[i].chooseAction();

                switch(thisTeam[i].action.type) {
                    case'attack': {
                        thisTeam[i].chooseTarget(thatTeam);
                        //TODO Check if target is valid
                        validTarget = true;
                        console.log('targeting ' + thisTeam[i].target.name);

                        this.attackTarget(thisTeam[i],thisTeam[i].target);
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
    }

    attackTarget(actor: Actor, target: Actor): void {
        console.log(actor.name + ' attacks ' + target.name + ' using ' + actor.action.name);
        
        var critical = false;
        var attackRoll = this.heroService.roll(1,20);
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
                 //console.log('critDamage: ' + critDamage);
            }
            //console.log('damageMod: '+ damageMod);
            
            allDamage = damageRoll + critDamage + damageMod;

            var targetDefMod;

            switch(actor.action.type) {
                case'attack': {
                    targetDefMod = this.getMod(target, 'vit');
                    break;
                }
                case'magic': {
                    targetDefMod = this.getMod(target, 'wis');
                    break;
                }
                case'grapple': {
                    targetDefMod = this.getMod(target, 'str');
                    break;
                }
                case'speak': {
                    targetDefMod = this.getMod(target, 'cha');
                    break;
                }
                case'speed': {
                    targetDefMod = this.getMod(target, 'dex');
                    break;
                }
                case'pyschic': {
                    targetDefMod = this.getMod(target, 'int');
                    break;
                }
                case'chance': {
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
            if (finalDamage < 0) finalDamage = 0;
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
    }

    getMod(actor: Actor, stat: string): number {
        var statVal;

        switch(stat) {
            case'str': {
                statVal = actor.str;
                break;
            }
            case'vit': {
                statVal = actor.vit;
                break;
            }
            case'int': {
                statVal = actor.int;
                break;
            }
            case'wis': {
                statVal = actor.wis;
                break;
            }
            case'dex': {
                statVal = actor.dex;
                break;
            }
            case'cha': {
                statVal = actor.cha;
                break;
            }
            case'luk': {
                statVal = actor.luk;
                break;
            }
        }

        return Math.floor(statVal/5);
    }

    checkAlive(team: Actor[]): boolean {
        for (var i=0;i<team.length;i++) {
            if (team[i].isAlive) return true;
        }
        return false;
    }

    doSurvival(party: Hero[], act: Activity): void {
        console.log('doSurvival');
    }

    talkToNpc(party: Hero[], act: Activity): void {
        console.log('talkToNpc');
    }

    bePassive(party: Hero[], act: Activity): void {
        console.log('bePassive');
    }

    doEncounter(party: Hero[], act: Activity): void {
        console.log('doEncounter');
    }

 }
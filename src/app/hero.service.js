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
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var HeroService = (function () {
    function HeroService(http) {
        this.http = http;
        this.heroesUrl = 'api/heroes'; //URL to "web api"
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    HeroService.prototype.getHeroes = function () {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    HeroService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    HeroService.prototype.getHero = function (id) {
        var url = this.heroesUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    HeroService.prototype.update = function (hero) {
        var url = this.heroesUrl + "/" + hero.id;
        return this.http
            .put(url, JSON.stringify(hero), { headers: this.headers })
            .toPromise()
            .then(function () { return hero; })
            .catch(this.handleError);
    };
    HeroService.prototype.create = function (name) {
        var stats = {
            str: this.roll4D6Drop1(),
            int: this.roll4D6Drop1(),
            vit: this.roll4D6Drop1(),
            wis: this.roll4D6Drop1(),
            dex: this.roll4D6Drop1(),
            cha: this.roll4D6Drop1(),
            luk: this.roll4D6Drop1()
        };
        return this.http
            .post(this.heroesUrl, JSON.stringify({
            name: name,
            inParty: false,
            isAlive: true,
            isVisible: true,
            hp: 100 + Math.floor((stats.vit * 2) + (stats.str * 1.5) + (stats.luk * .5)),
            mp: 30 + Math.floor((stats.int * 1.5) + stats.wis + (stats.luk * .25)),
            lvl: 1,
            exp: 0,
            str: stats.str,
            int: stats.int,
            vit: stats.vit,
            wis: stats.wis,
            dex: stats.dex,
            cha: stats.cha,
            luk: stats.luk
        }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    HeroService.prototype.delete = function (id) {
        var url = this.heroesUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    //Roll Dice
    HeroService.prototype.roll = function (numDice, diceType) {
        var total = 0;
        for (var i = 0; i < numDice; i++) {
            total += Math.floor(Math.random() * (diceType)) + 1;
        }
        return total;
    };
    HeroService.prototype.roll4D6Drop1 = function () {
        var total = 0;
        var rolls = [this.roll(1, 6), this.roll(1, 6),
            this.roll(1, 6), this.roll(1, 6)];
        var toDrop = 0;
        for (var i = 0; i < rolls.length; i++) {
            if (rolls[toDrop] > rolls[i])
                toDrop = i;
        }
        rolls.splice(toDrop, 1);
        for (var i = 0; i < rolls.length; i++) {
            total += rolls[i];
        }
        return total;
    };
    //Testing slow connection
    HeroService.prototype.getHeroesSlowly = function () {
        var _this = this;
        return new Promise(function (resolve) {
            // Simulates server latecy with 2 second delay
            setTimeout(function () { return resolve(_this.getHeroes()); }, 2000);
        });
    };
    return HeroService;
}());
HeroService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], HeroService);
exports.HeroService = HeroService;
//# sourceMappingURL=hero.service.js.map
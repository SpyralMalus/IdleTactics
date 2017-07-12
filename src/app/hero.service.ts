import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {
    private heroesUrl = 'api/heroes'; //URL to "web api"
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getHeroes(): Promise<Hero[]> {
       return this.http.get(this.heroesUrl)
                  .toPromise()
                  .then(response => response.json().data as Hero[])
                  .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getHero(id: number): Promise<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Hero)
            .catch(this.handleError);
    }

    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
                   .put(url, JSON.stringify(hero), {headers: this.headers})
                   .toPromise()
                   .then(() => hero)
                   .catch(this.handleError);
    }

    create(name: string): Promise<Hero> {
        var stats = {
            str: this.roll4D6Drop1(),
            int: this.roll4D6Drop1(),
            vit: this.roll4D6Drop1(),
            wis: this.roll4D6Drop1(),
            dex: this.roll4D6Drop1(),
            cha: this.roll4D6Drop1(),
            luk: this.roll4D6Drop1()
        }
            
        

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
                        
                    }), {headers: this.headers})
                   .toPromise()
                   .then(res => res.json().data as Hero)
                   .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
                   .toPromise()
                   .then(() => null)
                   .catch(this.handleError);
    }

    //Roll Dice
    roll(numDice: number, diceType: number): number {
        var total = 0;
        for (var i=0;i<numDice;i++) {
            total += Math.floor(Math.random() * (diceType)) + 1;
        }

        return <number>total;
    }
    roll4D6Drop1(): number {
        var total = 0;
        var rolls = [this.roll(1,6), this.roll(1,6),
                     this.roll(1,6), this.roll(1,6)];
        var toDrop = 0;

        for (var i=0;i<rolls.length;i++) {
            if (rolls[toDrop] > rolls[i]) toDrop = i;
        }
        
        rolls.splice(toDrop,1);

        for (var i=0;i<rolls.length;i++) {
            total += rolls[i];
        }
       
        return <number>total;
    }

    //Testing slow connection
    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise(resolve => {
            // Simulates server latecy with 2 second delay
            setTimeout(() => resolve(this.getHeroes()), 2000);
        });
    }
}
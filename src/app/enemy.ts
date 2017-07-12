import { Actor } from './actor';
import { Item } from './item';

export class Enemy extends Actor {
    difficulty: number;

    reward: {
        bonusExp: number;
        gold: number;
        items: Item[];
    };
}
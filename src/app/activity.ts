import { Actor } from './actor';
import { Enemy } from './enemy';

export class Activity {
    id: number;
    name: string;
    type: string;
    subType: string;
    difficulty: number;

    actors: Actor[];
    enemies: Enemy[];
}
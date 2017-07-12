import { Activity } from './activity';

export class Location {
    name: string;
    type: string;
    isUnlocked: boolean;
    atLocation: boolean;

    activities: Activity[];
}
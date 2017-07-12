"use strict";
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var heroes = [
            { id: 0, name: 'Zero', inParty: false, isAlive: false,
                isVisible: false, hp: 0, maxHp: 0, mp: 0, maxMp: 0,
                ct: 0, baseCt: 0, exp: 0, expNextLvl: 0, lvl: 0,
                str: 0, int: 0, vit: 0, wis: 0, dex: 0, cha: 0,
                luk: 0 },
            { id: 11, name: 'Starflower', inParty: true, isAlive: true,
                isVisible: true, hp: 100, maxHp: 166, mp: 30, maxMp: 65,
                ct: 2000, baseCt: 2000, exp: 0, expNextLvl: 300, lvl: 1,
                str: 12, int: 10, vit: 14, wis: 8, dex: 8, cha: 17,
                luk: 13, actions: [
                    {
                        id: 0, name: 'Dagger', type: 'attack', element: 'steel',
                        stat: 'str', numDice: 1, diceType: 6, effect: 'bleed', effectChance: 2
                    }
                ] },
            { id: 12, name: 'Spyral Malus', inParty: true, isAlive: true,
                isVisible: true, hp: 100, maxHp: 166, mp: 30, maxMp: 65,
                ct: 2000, baseCt: 2000, exp: 0, expNextLvl: 300, lvl: 1,
                str: 12, int: 10, vit: 14, wis: 8, dex: 8, cha: 17,
                luk: 13, actions: [
                    {
                        id: 0, name: 'Sword', type: 'attack', element: 'steel',
                        stat: 'str', numDice: 1, diceType: 8, effect: 'bleed', effectChance: 3
                    }
                ]
            },
        ];
        var locations = [
            {
                id: 0, name: 'Nowhere', type: 'none', isUnlocked: false, atLocation: false,
                activities: [
                    {
                        id: 0, name: 'Nothing', type: 'none', difficulty: 0, cp: 0
                    }
                ]
            },
            {
                id: 1, name: 'Grassy Field', type: 'wilderness', isUnlocked: true, atLocation: true,
                activities: [
                    {
                        id: 0, name: 'Battling a Wild Boar', type: 'battle', subType: 'beast',
                        difficulty: 3, enemies: [
                            {
                                id: 0, name: 'Wild Boar', lvl: 2, difficulty: 2, type: 'beast', str: 10, vit: 10,
                                int: 10, wis: 10, dex: 10, cha: 10, luk: 10,
                                actions: [
                                    {
                                        id: 0, name: 'Gore', type: 'attack', element: 'nature',
                                        stat: 'str', numDice: 1, diceType: 8, effect: 'bleed', effectChance: 5
                                    }
                                ],
                                reward: {
                                    bonusExp: 10,
                                    gold: 10,
                                    items: [
                                        {
                                            id: 0, name: 'Tusk', type: 'drop', value: 10, rarity: 10
                                        }
                                    ]
                                },
                                isAlive: true, isVisible: true
                            }
                        ]
                    },
                ]
            }
        ];
        return { heroes: heroes, locations: locations };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map
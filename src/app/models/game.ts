import { CardJson } from "./card.json";

export class Game {

    public playerDeck: CardJson[] = [];
    public playerDiscardDeck: CardJson[] = [];
    public encounterDeck: CardJson[] = [];
    public discardEncounterDeck: CardJson[] = [];
    public heroCards: CardJson[] = [];
    public villainCards: CardJson[] = [];
    public mainSchemes: CardJson[] = [];
    public sideSchemes: CardJson[] = [];
    public nemesisDeck: CardJson[] = [];
    public allies: CardJson[] = [];
    public heroUpgrades: CardJson[] = [];
    public heroSupport: CardJson[] = [];
    public villainCardsInPlay: CardJson[] = [];
    public playerHand: CardJson[] = [];
    public environments: CardJson[] = [];
    public villainStage: number = 1;

    constructor() {

    }


}
import { CardJson } from "./card.json";
import { Ally } from "./cards/ally";
import { Attachment } from "./cards/attachment";
import { Environment } from "./cards/environment";
import { Hero } from "./cards/hero";
import { MainScheme } from "./cards/mainScheme";
import { Minion } from "./cards/minion";
import { PlayerCard } from "./cards/playerCard";
import { SideScheme } from "./cards/sideScheme";
import { Support } from "./cards/support";
import { Upgrade } from "./cards/upgrade";
import { Villain } from "./cards/villain";
import { VillainCard } from "./cards/villainCard";

export class Game {

    private encounterDeck: CardJson[] = [];
    private discardEncounterDeck: CardJson[] = [];
    private villainCards: CardJson[] = [];
    private nemesisDeck: CardJson[] = [];
    private villainCardsInPlay: CardJson[] = [];
    
    private environments: CardJson[] = [];

    private hero!: Hero;
    private villain!: Villain;
    private mainScheme!: MainScheme;
    private playerHand: PlayerCard[] = [];
    private playerDeck: PlayerCard[] = [];
    private playerDiscardDeck: PlayerCard[] = [];
    private vIllainCards: VillainCard[] = [];
    private minions: Minion[] = [];
    private attachments: Attachment[] = [];
    private sideSchemes: SideScheme[] = [];
    private allies: Ally[] = [];
    private supports: Support[] = [];
    private upgrades: Upgrade[] = [];
    private enviroNments: Environment[] = [];

    // Getters and Setters

    // playerDeck
    getPlayerDeck(): PlayerCard[] {
        return this.playerDeck;
    }

    setPlayerDeck(deck: PlayerCard[]): void {
        this.playerDeck = deck;
    }

    // playerDiscardDeck
    getPlayerDiscardDeck(): PlayerCard[] {
        return this.playerDiscardDeck;
    }

    setPlayerDiscardDeck(deck: PlayerCard[]): void {
        this.playerDiscardDeck = deck;
    }

    // encounterDeck
    getEncounterDeck(): CardJson[] {
        return this.encounterDeck;
    }

    setEncounterDeck(deck: CardJson[]): void {
        this.encounterDeck = deck;
    }

    // discardEncounterDeck
    getDiscardEncounterDeck(): CardJson[] {
        return this.discardEncounterDeck;
    }

    setDiscardEncounterDeck(deck: CardJson[]): void {
        this.discardEncounterDeck = deck;
    }

    // villainCards
    getVillainCards(): CardJson[] {
        return this.villainCards;
    }

    setVillainCards(cards: CardJson[]): void {
        this.villainCards = cards;
    }

    getMinions(): Minion[] {
        return this.minions;
    }

    // sideSchemes
    getSideSchemes(): SideScheme[] {
        return this.sideSchemes;
    }

    setSideSchemes(schemes: SideScheme[]): void {
        this.sideSchemes = schemes;
    }

    // nemesisDeck
    getNemesisDeck(): CardJson[] {
        return this.nemesisDeck;
    }

    setNemesisDeck(deck: CardJson[]): void {
        this.nemesisDeck = deck;
    }

    // allies
    getAllies(): Ally[] {
        return this.allies;
    }

    setAllies(allies: Ally[]): void {
        this.allies = allies;
    }

    // heroUpgrades
    getHeroUpgrades(): Upgrade[] {
        return this.upgrades;
    }

    setHeroUpgrades(upgrades: Upgrade[]): void {
        this.upgrades = upgrades;
    }

    // heroSupport
    getHeroSupport(): Support[] {
        return this.supports;
    }

    setHeroSupport(support: Support[]): void {
        this.supports = support;
    }

    // villainCardsInPlay
    getVillainCardsInPlay(): CardJson[] {
        return this.villainCardsInPlay;
    }

    setVillainCardsInPlay(cards: CardJson[]): void {
        this.villainCardsInPlay = cards;
    }

    // playerHand
    getPlayerHand(): PlayerCard[] {
        return this.playerHand;
    }

    setPlayerHand(hand: PlayerCard[]): void {
        this.playerHand = hand;
    }

    // environments
    getEnvironments(): CardJson[] {
        return this.environments;
    }

    setEnvironments(envs: CardJson[]): void {
        this.environments = envs;
    }

    getHero(): Hero {
        return this.hero;
    }

    getVillain(): Villain {
        return this.villain;
    }

    getMainScheme(): MainScheme {
        return this.mainScheme;
    }

    setHero(hero: Hero): void {
        this.hero = hero;
    }

    setVillain(villain: Villain): void {
        this.villain = villain;
    }

    setMainScheme(mainScheme: MainScheme): void {
        this.mainScheme = mainScheme;
    }


}
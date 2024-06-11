import { CardJson } from "../card.json";
import { DamageTarget } from "./interfaces/damageTarget";

export class Villain implements DamageTarget{
    private stages: VillainStage[] = [];
    private stageIndex: number;
    private card_set_code: string;
    imagesrc: string;

    constructor(cards: CardJson[]) {
        let count = 1;
        cards.forEach(card => {
            this.stages.push(new VillainStage(count, card.health!, card.attack!, card.scheme!, card.imagesrc!))
            count++;
        })
        this.stageIndex = 0;
        this.card_set_code = cards[0].card_set_code!;
        this.imagesrc = this.getCurrentStage().getImagesrc();
    }
    dealDamage(amount: number): void {
        console.log("Dealing " + amount + " damages to the villain")
        const currentStage = this.getCurrentStage();
        currentStage.setHealth(currentStage.getHealth() - amount);
    }

    getCurrentStage(): VillainStage {
        return this.stages[this.stageIndex];
    }

    getCardSetCode(): string {
        return this.card_set_code;
    }
}

export class VillainStage {
    private phaseNumber: number;
    private health: number;
    private attack: number;
    private scheme: number;
    private imagesrc: string;

    constructor(phaseNumber: number, health: number, attack: number, scheme: number, imagesrc: string) {
        this.phaseNumber = phaseNumber;
        this.health = health;
        this.attack = attack;
        this.scheme = scheme;
        this.imagesrc = 'https://marvelcdb.com' + imagesrc;
    }

    getPhaseNumber(): number {
        return this.phaseNumber;
    }

    getHealth(): number {
        return this.health;
    }

    setHealth(health: number): void {
        this.health = health;
    }

    getAttack(): number {
        return this.attack;
    }

    setScheme(scheme: number) {
        this.scheme = scheme;
    }

    getScheme(): number {
        return this.scheme;
    }

    getImagesrc(): string {
        return this.imagesrc;
    }
}
import { CardJson } from "../card.json";

export class MainScheme {
    private stages: MainSchemeStage[] = [];
    private stageIndex: number;
    imagesrc: string;

    constructor(cards: CardJson[]) {
        let count = 1;
        cards.forEach(card => {
            this.stages.push(new MainSchemeStage(count, card.threat!, card.base_threat!, card.escalation_threat!, card.imagesrc!))
            count++;
        })
        this.stageIndex = 0;
        this.imagesrc = this.getCurrentStage().getImagesrc();
    }

    getCurrentThreat(): number {
        return this.stages[this.stageIndex].getCurrentThreat();
    }

    getCurrentStage(): MainSchemeStage {
        return this.stages[this.stageIndex];
    }

    thwart(amount: number) {
        this.getCurrentStage().thwart(amount);
    }
}

export class MainSchemeStage {
    private stage: number;
    private threat: number;
    private baseThreat: number;
    private escalationThreat: number;
    private currentThreat: number;
    private imagesrc: string;

    constructor(stage: number, threat: number, baseThreat: number, escalationThreat: number, imagesrc: string) {
        this.stage = stage;
        this.threat = threat;
        this.baseThreat = threat;
        this.escalationThreat = escalationThreat;
        this.currentThreat = 6;
        this.imagesrc = 'https://marvelcdb.com' + imagesrc;
    }

    getCurrentThreat(): number {
        return this.currentThreat;
    }

    getImagesrc(): string {
        return this.imagesrc;
    }

    thwart(amount: number) {
        this.currentThreat -= amount;
    }
}
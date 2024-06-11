import { CardJson } from "../card.json";
import { VillainCard } from "./villainCard";

export class SideScheme extends VillainCard{
    private baseThreat: number;
    private currentThreat: number;

    constructor(card: CardJson) {
        super(card);
        this.baseThreat = card.base_threat!;
        this.currentThreat = this.baseThreat;
    }

    thwart(amount: number) {
        this.currentThreat -= amount;
    }
}
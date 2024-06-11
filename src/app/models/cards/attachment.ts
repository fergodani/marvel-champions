import { CardJson } from "../card.json";
import { VillainCard } from "./villainCard";

export class Attachment extends VillainCard {

    constructor(card: CardJson) {
        super(card);
    }
}
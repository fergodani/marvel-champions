import { CardJson } from "../card.json";
import { PlayerCard } from "./playerCard";

export class Support extends PlayerCard {
    constructor(card: CardJson) {
        super(card);
    }
}
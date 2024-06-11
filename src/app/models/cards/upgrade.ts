import { CardJson } from "../card.json";
import { PlayerCard } from "./playerCard";

export class Upgrade extends PlayerCard {
    constructor(card: CardJson) {
        super(card);
    }
}
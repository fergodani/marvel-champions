import { CardJson } from "../card.json";
import { PlayerCard } from "./playerCard";

export class Resource extends PlayerCard {
    constructor(card: CardJson) {
        super(card);
    }
}
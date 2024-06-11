import { CardJson } from "../card.json";
import { PlayerCard } from "./playerCard";

export class Event extends PlayerCard {
    constructor(card: CardJson) {
        super(card);
    }
}
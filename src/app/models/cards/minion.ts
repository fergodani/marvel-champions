import { CardJson } from "../card.json";
import { DamageTarget } from "./interfaces/damageTarget";
import { VillainCard } from "./villainCard";

export class Minion extends VillainCard implements DamageTarget{

    constructor(card: CardJson) {
        super(card);
    }

    public dealDamage(amount: number): void {
        console.log("Dealing " + amount + " damages to " + this.getName())
    }
}
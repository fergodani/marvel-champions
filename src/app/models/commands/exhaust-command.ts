import { GameService } from "../../services/game.service";
import { Exhaustable } from "../cards/interfaces/exhaustable";
import { Command } from "./command";

export class ExhaustCommand implements Command {
    private target: Exhaustable

    constructor(target: Exhaustable) {
        this.target = target;
    }

    async execute(): Promise<void> {
        this.target.exhaust();
    }
}
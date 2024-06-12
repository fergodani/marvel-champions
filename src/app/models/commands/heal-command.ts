import { GameService } from '../../services/game.service';
import { HealTarget } from '../cards/interfaces/healTarget';
import { Command } from './command';

export class HealCommand implements Command {

    private amount: number;
    private target: HealTarget | null;
    private gameService: GameService

    constructor(amount: number, gameService: GameService) {
        this.amount = amount;
        this.gameService = gameService;
        this.target = null;
    }

    constructor(amount: number, target: HealTarget, gameService: GameService) {
        this.amount = amount;
        this.gameService = gameService;
        this.target = target;
    }

    async execute(): Promise<void> {
        if (!this.target)
            this.target = await this.gameService.openHealTargetDialog()
        if (target)
            target.heal(this.amount);
    }
}
import { GameService } from '../../services/game.service';
import { Command } from './command';

export class DamageCommand implements Command {

    private amount: number;
    private gameService: GameService

    constructor(amount: number, gameService: GameService) {
        this.amount = amount;
        this.gameService = gameService;
    }

    async execute(): Promise<void> {
        const target = await this.gameService.openDamageTargetDialog()
        if (target)
            target.dealDamage(this.amount);
    }
}
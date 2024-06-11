import { GameService } from '../../services/game.service';
import { Command } from './command';

export class ThwartCommand implements Command {

    private amount: number;
    private gameService: GameService

    constructor(amount: number, gameService: GameService) {
        this.amount = amount;
        this.gameService = gameService;
    }

    async execute(): Promise<void> {
        const amount = this.amount;
        const target = await this.gameService.openSchemeTargetDialog()
        if (target)
            target.thwart(amount);
    }
}
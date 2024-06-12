import { GameService } from '../../services/game.service';
import { DamageTarget } from '../cards/interfaces/damageTarget';
import { Command } from './command';

export class DamageCommand implements Command {

    private amount: number;
    private target: DamageTarget | null;
    private gameService: GameService

    constructor(amount: number, gameService: GameService) {
        this.amount = amount;
        this.gameService = gameService;
        this.target = null;
    }

    constructor(amount: number, target: DamageTarget, gameService: GameService) {
        this.amount = amount;
        this.gameService = gameService;
        this.target = target;
    }

    async execute(): Promise<void> {
        if (!this.target)
            this.target = await this.gameService.openDamageTargetDialog()
        if (target)
            target.dealDamage(this.amount);
    }
}
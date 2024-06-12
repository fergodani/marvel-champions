import { GameService } from '../../services/game.service';
import { DamageTarget } from '../cards/interfaces/damageTarget';
import { Command } from './command';

export class DamageCommand implements Command {

    private amount: number;
    private target: DamageTarget | null;
    private gameService: GameService

    constructor(amount: number, gameService: GameService, target?: DamageTarget) {
        this.amount = amount;
        this.gameService = gameService;
        this.target = target !== undefined ? target: null;
    }

    async execute(): Promise<void> {
        if (!this.target)
            this.target = await this.gameService.openDamageTargetDialog()
        if (this.target)
            this.target.dealDamage(this.amount);
    }
}
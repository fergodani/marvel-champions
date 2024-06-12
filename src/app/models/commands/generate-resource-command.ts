import { GameService } from "../../services/game.service";
import { Command } from "./command";

export class GenerateResourceCommand implements Command {

    private type: string;
    private amount: number;
    private gameService: GameService;

    constructor(type: string, amount: number, gameService: GameService) {
        this.type = type;
        this.amount = amount;
        this.gameService = gameService;
    }

    execute() {
        const game = this.gameService.getGame();
        switch (this.type) {
            case "energy": {
                game.setEnergyResources(this.amount);
                break;
            }
            case "physical": {
                game.setPhysicalResources(this.amount);
                break;
            }
            case "mental": {
                game.setMentalResources(this.amount);
                break;
            }
            case "wild": {
                game.setWildResources(this.amount);
                break;
            }
            default: { 
                console.error("Unknown resource type " + this.type);
                break; 
             }
        }
        this.gameService.updateGame(game);
    } 

}
import { Command } from './command';

export class DamageCommand implements Command {
    constructor(private target: string, private amount: number) {}

    execute(): void {
        console.log(`Dealing ${this.amount} damage to ${this.target}`);
        // Implementar la lógica para hacer daño
    }
}
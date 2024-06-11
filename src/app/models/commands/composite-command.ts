import { Command } from './command';

export class CompositeCommand implements Command {
    private commands: Command[] = [];

    add(command: Command): void {
        this.commands.push(command);
    }

    async execute(): Promise<void> {
        for (const command of this.commands) {
            await command.execute();
        }
    }
}
import { Command } from './command';

export class CompositeCommand implements Command {
    private commands: Command[] = [];

    add(command: Command): void {
        this.commands.push(command);
    }

    execute(): void {
        for (const command of this.commands) {
            command.execute();
        }
    }
}
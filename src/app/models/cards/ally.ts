import { GameService } from "../../services/game.service";
import { CardJson } from "../card.json";
import { CompositeCommand } from "../commands/composite-command";
import { DamageCommand } from "../commands/damage-command";
import { ExhaustCommand } from "../commands/exhaust-command";
import { ThwartCommand } from "../commands/thwart-command";
import { Exhaustable } from "./interfaces/exhaustable";
import { PlayerCard } from "./playerCard";

export class Ally extends PlayerCard implements Exhaustable {
    private health: number;
    private attack: number;
    private thwart: number;
    exhausted: boolean = false;
    private attackCommand: CompositeCommand;
    private thwartCommand: CompositeCommand;

    constructor(card: CardJson, gameService: GameService) {
        super(card);
        this.health = card.health!;
        this.attack = card.attack!;
        this.thwart = card.thwart!;
        this.attackCommand = new CompositeCommand();
        this.attackCommand.add(new DamageCommand(this.attack, gameService));
        this.attackCommand.add(new ExhaustCommand(this));

        this.thwartCommand = new CompositeCommand();
    this.thwartCommand.add(new ThwartCommand(this.thwart, gameService));
    this.thwartCommand.add(new ExhaustCommand(this));
    }

    public executeAttack() {
        if (this.exhausted) return;
        this.attackCommand.execute();
    }

    public executeThwart() {
        if (this.exhausted) return;
        this.thwartCommand.execute();
      }

    isExhausted(): boolean {
        return this.exhausted;
    }
    exhaust(): void {
        this.exhausted = true;
    }
    prepare(): void {
        this.exhausted = false;
    }

    getHealth(): number {
        return this.health;
    }

    setHealth(health: number): void {
        this.health = health;
    }

    getAttack(): number {
        return this.attack;
    }

    setAttack(attack: number): void {
        this.attack = attack;
    }

    getThwart(): number {
        return this.attack;
    }

    setThwart(thwart: number): void {
        this.thwart = thwart;
    }
}
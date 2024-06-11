import { DialogService } from "../../services/dialog.service";
import { GameService } from "../../services/game.service";
import { CardJson } from "../card.json";
import { Command } from "../commands/command";
import { CompositeCommand } from "../commands/composite-command";
import { DamageCommand } from "../commands/damage-command";
import { ExhaustCommand } from "../commands/exhaust-command";
import { ThwartCommand } from "../commands/thwart-command";
import { Exhaustable } from "./interfaces/exhaustable";
import { PlayerCard } from "./playerCard";

export class Hero implements Exhaustable {
  private health: number;
  private attack: number;
  private thwart: number;
  private defense: number;
  private heroHandSize: number;
  private alterEgoHandSize: number;
  private recover: number;
  private isAlterEgo: boolean;
  private card_set_code: string;
  private heroImagesrc: string;
  private alterEgoImagesrc: string;
  private attackCommand: CompositeCommand;
  private thwartCommand: CompositeCommand;
  exhausted: boolean = false;

  constructor(card: CardJson, gameService: GameService) {
    this.health = card.health!;
    this.attack = card.attack!;
    this.thwart = card.thwart!;
    this.defense = card.defense!;
    this.heroHandSize = card.hand_size!;
    this.alterEgoHandSize = card.linked_card?.hand_size!;
    this.recover = card.linked_card?.recover!;
    this.isAlterEgo = true;
    this.card_set_code = card.card_set_code!;
    this.heroImagesrc = card.imagesrc ? 'https://marvelcdb.com' + card.imagesrc : 'https://marvelcdb.com/bundles/cards/' + card.code + '.png';
    this.alterEgoImagesrc = card.linked_card?.imagesrc ? 'https://marvelcdb.com' + card.linked_card?.imagesrc : 'https://marvelcdb.com/bundles/cards/' + card.code + '.png';
    this.attackCommand = new CompositeCommand();
    this.attackCommand.add(new DamageCommand(this.attack, gameService));
    this.attackCommand.add(new ExhaustCommand(this));

    this.thwartCommand = new CompositeCommand();
    this.thwartCommand.add(new ThwartCommand(this.thwart, gameService));
    this.thwartCommand.add(new ExhaustCommand(this));
  }

  exhaust(): void {
    this.exhausted = true;
  }
  prepare(): void {
    this.exhausted = false;
  }

  public executeAttack() {
    if (this.exhausted) return;
    this.attackCommand.execute();
  }

  public executeThwart() {
    if (this.exhausted) return;
    this.thwartCommand.execute();
  }


  public isExhausted(): boolean {
    return this.exhausted;
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
    return this.thwart;
  }

  setThwart(thwart: number): void {
    this.thwart = thwart;
  }

  getDefense(): number {
    return this.defense;
  }

  setDefense(defense: number): void {
    this.defense = defense;
  }

  getIsAlterEgo(): boolean {
    return this.isAlterEgo;
  }

  setIsAlterEgo(isAlterEgo: boolean): void {
    this.isAlterEgo = isAlterEgo;
  }

  getCardSetCode(): string {
    return this.card_set_code;
  }

  getAlterEgoHandSize(): number {
    return this.alterEgoHandSize;
  }

  getHeroImagesrc(): string {
    return this.heroImagesrc;
  }

  getAlterEgoImagesrc(): string {
    return this.alterEgoImagesrc;
  }
}

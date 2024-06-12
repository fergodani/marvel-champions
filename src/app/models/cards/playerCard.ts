import { CardJson } from "../card.json";

export abstract class PlayerCard {
  protected code: string;
  protected name: string;
  protected type: string;
  protected imagesrc: string;
  protected traits: string[];
  protected energyResources: number;
  protected wildResources: number;
  protected mentalResources: number;
  protected physicalResources: number;
  protected cost: number;
  protected counters: number;

  constructor(card: CardJson) {
    this.code = card.code!;
    this.name = card.name!;
    this.type = card.type_code!;
    this.imagesrc = card.imagesrc ? 'https://marvelcdb.com' + card.imagesrc : 'https://marvelcdb.com/bundles/cards/' + card.code + '.png';
    this.traits = card.traits?.split('.')!;
    this.energyResources = card.resource_energy ? card.resource_energy : 0;
    this.wildResources = card.resource_wild ? card.resource_wild : 0;
    this.mentalResources = card.resource_mental ? card.resource_mental : 0;
    this.physicalResources = card.resource_physical ? card.resource_physical : 0;
    this.cost = card.cost!;
    this.counters = 0;
  }

  play() {
    console.log("Youre going to play: " + this.getName());
  }

  public getName(): string {
    return this.name;
  }

  public getCode(): string {
    return this.code;
  }

  public getImageSrc(): string {
    return this.imagesrc;
  }

  public getEnergyResources(): number {
    return this.energyResources;
  }

  public getWildResources(): number {
    return this.wildResources;
  }

  public getMentalResources(): number {
    return this.mentalResources;
  }

  public getPhysicalResources(): number {
    return this.physicalResources;
  }

  public getCost(): number {
    return this.cost;
  }

  public getType(): string {
    return this.type;
  }

  public setCounters(amount: number) {
    this.counters = amount;
  }

  public getCounters(): number {
    return this.counters;
  }

}
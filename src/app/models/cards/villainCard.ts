import { CardJson } from "../card.json";

export class VillainCard {
    private name: string;
    private boost: number;
    imagesrc: string;

    constructor(card: CardJson) {
        this.name = card.name!;
        this.boost = card.boost!;
        this.imagesrc = card.imagesrc ? 'https://marvelcdb.com' + card.imagesrc : 'https://marvelcdb.com/bundles/cards/' + card.code + '.png';
    }

    public getName(): string {
        return this.name;
    }

    public getBoost(): number {
        return this.boost;
    }

    public getImagesrc(): string {
        return this.imagesrc;
    } 
}
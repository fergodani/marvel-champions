export interface HealTarget {
    imagesrc: string;
    heal(amount: number): void;
}
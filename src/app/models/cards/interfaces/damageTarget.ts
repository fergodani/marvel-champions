export interface DamageTarget {
    imagesrc: string;
    dealDamage(amount: number): void;
}
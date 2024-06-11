export interface Exhaustable {
    exhausted: boolean;
    exhaust(): void;
    prepare(): void;
    isExhausted(): boolean;
}
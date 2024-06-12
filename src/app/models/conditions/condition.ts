export interface Condition {
    evaluate(context: GameContext): boolean;
}

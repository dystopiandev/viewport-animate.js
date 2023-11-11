import { type DefaultAnimationProperties } from "./animation-properties.js";
/**
 * @class ViewportAnimate - Animate elements on scroll
 * @param {ViewportAnimateOptions} options - Options for the ViewportAnimate class
 * @example
 * const viewportAnimate = new ViewportAnimate({
 *   attribute: "data-va",
 *   observerThreshold: 0.01,
 *   defaultAnimationProperties: {},
 * });
 */
export declare class ViewportAnimate {
    private readonly options;
    constructor(options?: Partial<ViewportAnimateOptions>);
    init(): void;
    private animate;
    private resolveAnimationData;
    parseObserverThresholds(thresholdExpression: string): number | number[];
    parseAnimationPlayKind(char?: string): AnimationPlayKind | null;
}
declare enum AnimationPlayKind {
    ONCE = "@",
    REPLAY = "*",
    INFINITE = "!"
}
type ViewportAnimateOptions = {
    /** The attribute to look for on elements to animate */
    attribute: string;
    /** The threshold for the IntersectionObserver */
    observerThreshold: number | number[];
    defaultAnimationProperties: DefaultAnimationProperties;
};
export {};

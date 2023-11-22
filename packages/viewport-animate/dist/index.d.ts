export declare type AnimationDirection = "normal" | "reverse" | "alternate" | "alternate-reverse";

export declare type AnimationFillMode = "none" | "forwards" | "backwards" | "both";

export declare type AnimationIterationCount = number | "infinite";

export declare enum AnimationPlayKind {
    ONCE = "@",
    REPLAY = "*",
    INFINITE = "!"
}

export declare class AnimationProperties {
    name: string;
    duration: string;
    timingFunction: string;
    delay: string;
    iterationCount: AnimationIterationCount;
    direction: AnimationDirection;
    fillMode: AnimationFillMode;
    playState: AnimationPlayState;
    timeline: string;
    constructor(defaultProps: DefaultAnimationProperties, props: Partial<AnimationProperties>);
    static fromAnimationExpression(defaultProps: DefaultAnimationProperties, animationExpression: string): AnimationProperties;
    toString(): string;
}

export declare type DefaultAnimationProperties = Partial<Omit<AnimationProperties, "name" | "timeline">>;

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

export declare type ViewportAnimateOptions = {
    /** The attribute to look for on elements to animate */
    attribute: string;
    /** The threshold for the IntersectionObserver */
    observerThreshold: number | number[];
    /** The default animation properties to use if not specified on the element */
    defaultAnimationProperties: DefaultAnimationProperties;
};

export { }

export type AnimationDirection = "normal" | "reverse" | "alternate" | "alternate-reverse";
export type AnimationFillMode = "none" | "forwards" | "backwards" | "both";
export type AnimationIterationCount = number | "infinite";
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
export type DefaultAnimationProperties = Partial<Omit<AnimationProperties, "name" | "timeline">>;

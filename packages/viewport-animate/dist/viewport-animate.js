import { AnimationProperties, } from "./animation-properties.js";
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
export class ViewportAnimate {
    constructor(options) {
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                attribute: "data-va",
                observerThreshold: 0.01,
                defaultAnimationProperties: {},
            }
        });
        Object.assign(this.options, options);
        Object.assign(this.options.defaultAnimationProperties, new AnimationProperties(options?.defaultAnimationProperties ?? {}, {}));
    }
    init() {
        const elements = document.querySelectorAll(`[${this.options.attribute}]`);
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            element.style.opacity = "0";
            const animationExpr = element
                .getAttribute(this.options.attribute)
                .trim();
            const animationData = this.resolveAnimationData(animationExpr);
            if (!animationData) {
                continue;
            }
            if (animationData.animationPlayKind === AnimationPlayKind.REPLAY) {
                new IntersectionObserver(async (entries) => {
                    for (let i = 0; i < entries.length; i++) {
                        const entry = entries[i];
                        if (!entry.isIntersecting) {
                            element.style.opacity = "0";
                            element.style.animation = "none";
                        }
                    }
                }, {
                    threshold: 0.001,
                }).observe(element);
            }
            new IntersectionObserver((entries, observer) => {
                for (let i = 0; i < entries.length; i++) {
                    const entry = entries[i];
                    if (entry.isIntersecting) {
                        element.style.opacity = "1";
                        this.animate(entry, animationData);
                        if (animationData.animationPlayKind === AnimationPlayKind.ONCE) {
                            observer.disconnect();
                        }
                    }
                }
            }, {
                threshold: animationData.thresholds,
            }).observe(element);
        }
    }
    animate(entry, animationData) {
        const element = entry.target;
        element.style.animation = animationData.animation.toString();
        if (animationData.animationPlayKind === AnimationPlayKind.INFINITE) {
            element.style.animationIterationCount = "infinite";
        }
    }
    resolveAnimationData(animationExpression) {
        const sanitizedExpression = animationExpression.replace(/\s+/g, " ").trim();
        if (!sanitizedExpression) {
            return null;
        }
        const animationPlayKind = this.parseAnimationPlayKind(sanitizedExpression[0]);
        const animationPropsExpression = animationPlayKind
            ? sanitizedExpression.substring(sanitizedExpression.indexOf(" ") + 1)
            : sanitizedExpression;
        const thresholds = animationPlayKind
            ? this.parseObserverThresholds(sanitizedExpression.substring(1).split(" ")[0])
            : this.options.observerThreshold;
        return {
            animationPlayKind: animationPlayKind ?? AnimationPlayKind.ONCE,
            animation: AnimationProperties.fromAnimationExpression(this.options.defaultAnimationProperties, animationPropsExpression),
            thresholds,
        };
    }
    parseObserverThresholds(thresholdExpression) {
        const thresholds = thresholdExpression
            .split(",")
            .map((t) => parseFloat(t.trim()))
            .filter((t) => !isNaN(t));
        return thresholds.length < 1 ? this.options.observerThreshold : thresholds;
    }
    parseAnimationPlayKind(char) {
        switch (char) {
            case "@":
                return AnimationPlayKind.ONCE;
            case "*":
                return AnimationPlayKind.REPLAY;
            case "!":
                return AnimationPlayKind.INFINITE;
            default:
                return null;
        }
    }
}
export var AnimationPlayKind;
(function (AnimationPlayKind) {
    AnimationPlayKind["ONCE"] = "@";
    AnimationPlayKind["REPLAY"] = "*";
    AnimationPlayKind["INFINITE"] = "!";
})(AnimationPlayKind || (AnimationPlayKind = {}));

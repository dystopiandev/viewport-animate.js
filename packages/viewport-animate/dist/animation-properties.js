export class AnimationProperties {
    constructor(defaultProps, props) {
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "duration", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timingFunction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "delay", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "iterationCount", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "direction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "fillMode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "playState", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timeline", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = props.name || "";
        this.duration =
            props.duration || defaultProps.duration || "1s";
        this.timingFunction =
            props.timingFunction ||
                defaultProps.timingFunction ||
                "ease";
        this.delay = props.delay || defaultProps.delay || "0s";
        this.iterationCount =
            props.iterationCount ||
                defaultProps.iterationCount ||
                1;
        this.direction = ((props.direction || defaultProps.direction || "normal"));
        this.fillMode = ((props.fillMode || defaultProps.fillMode || "both"));
        this.playState = ((props.playState || defaultProps.playState || "running"));
        this.timeline = props.timeline || "";
    }
    static fromAnimationExpression(defaultProps, animationExpression) {
        const expr = animationExpression.trim().replace(/\s+/g, " ");
        const parts = expr.split(" ");
        const props = {
            name: parts[0],
        };
        for (let i = 1; i < parts.length; i++) {
            if (parts[i].startsWith("+")) {
                props.duration = parts[i].substring(1);
                continue;
            }
            else if (parts[i].startsWith("-")) {
                props.delay = parts[i].substring(1);
                continue;
            }
            else if (parts[i].endsWith("x")) {
                if (!props.iterationCount) {
                    props.iterationCount = parseFloat(parts[i].slice(0, -1));
                }
                continue;
            }
            else {
                return new AnimationProperties(defaultProps, {
                    name: parts[0],
                    duration: parts[1],
                    timingFunction: parts[2],
                    delay: parts[3],
                    iterationCount: parts[4],
                    direction: parts[5],
                    fillMode: parts[6],
                    playState: parts[7],
                    timeline: parts[8],
                });
            }
        }
        return new AnimationProperties(defaultProps, props);
    }
    toString() {
        return `${this.name} ${this.duration} ${this.timingFunction} ${this.delay} ${this.iterationCount} ${this.direction} ${this.fillMode} ${this.playState} ${this.timeline}`;
    }
}

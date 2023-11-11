export type AnimationDirection =
  | "normal"
  | "reverse"
  | "alternate"
  | "alternate-reverse";

export type AnimationFillMode = "none" | "forwards" | "backwards" | "both";

export type AnimationIterationCount = number | "infinite";

export class AnimationProperties {
  name: string;
  duration: string;
  timingFunction: string;
  delay: string;
  iterationCount: AnimationIterationCount;
  direction: AnimationDirection;
  fillMode: AnimationFillMode;
  playState: AnimationPlayState;
  timeline: string;

  constructor (
    defaultProps: DefaultAnimationProperties,
    props: Partial<AnimationProperties>
  ) {
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
    this.direction = <AnimationDirection>(
      (props.direction || defaultProps.direction || "normal")
    );
    this.fillMode = <AnimationFillMode>(
      (props.fillMode || defaultProps.fillMode || "both")
    );
    this.playState = <AnimationPlayState>(
      (props.playState || defaultProps.playState || "running")
    );
    this.timeline = props.timeline || "";
  }

  public static fromAnimationExpression (
    defaultProps: DefaultAnimationProperties,
    animationExpression: string
  ): AnimationProperties {
    const expr = animationExpression.trim().replace(/\s+/g, " ");
    const parts = expr.split(" ");
    const props: Partial<AnimationProperties> = {
      name: parts[0]!,
    };

    for (let i = 1; i < parts.length; i++) {
      if (parts[i]!.startsWith("+")) {
        props.duration = parts[i]!.substring(1);
        continue;
      }
      else if (parts[i]!.startsWith("-")) {
        props.delay = parts[i]!.substring(1);
        continue;
      }
      else if (parts[i]!.endsWith("x")) {
        if (!props.iterationCount) {
          props.iterationCount = parseFloat(parts[i]!.slice(0, -1));
        }

        continue;
      }
      else {
        return new AnimationProperties(
          defaultProps,
          {
            name: parts[0],
            duration: parts[1],
            timingFunction: parts[2],
            delay: parts[3],
            iterationCount: <AnimationIterationCount>parts[4],
            direction: <AnimationDirection>parts[5],
            fillMode: <AnimationFillMode>parts[6],
            playState: <AnimationPlayState>parts[7],
            timeline: parts[8],
          }
        );
      }
    }

    return new AnimationProperties(
      defaultProps,
      props
    );
  }

  public toString (): string {
    return `${this.name} ${this.duration} ${this.timingFunction} ${this.delay} ${this.iterationCount} ${this.direction} ${this.fillMode} ${this.playState} ${this.timeline}`;
  }
}

export type DefaultAnimationProperties = Partial<
  Omit<AnimationProperties, "name" | "timeline">
>;

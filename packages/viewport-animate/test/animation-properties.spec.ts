import { describe, expect, it } from "vitest";
import {
  AnimationProperties,
  DefaultAnimationProperties,
} from "../src/index.js";

const defaultProps: DefaultAnimationProperties = new AnimationProperties(
  {},
  {}
);

describe("AnimationProperties", () => {
  it("should be a class", () => {
    expect(AnimationProperties).toBeInstanceOf(Function);
    expect(AnimationProperties.prototype.constructor).toBeInstanceOf(Function);
  });

  describe(".prototype.constructor", () => {
    it("should be able to create AnimationProperties from defaultProps and partial props", () => {
      const props = new AnimationProperties(defaultProps, {
        name: "fadeIn",
        duration: "1.7s",
        timingFunction: "ease-in",
        delay: "0s",
        iterationCount: "infinite",
        direction: "reverse",
        fillMode: "forwards",
        timeline: "alternate",
      });

      expect(props.name).toBe("fadeIn");
      expect(props.duration).toBe("1.7s");
      expect(props.timingFunction).toBe("ease-in");
      expect(props.delay).toBe("0s");
      expect(props.iterationCount).toBe("infinite");
      expect(props.direction).toBe("reverse");
      expect(props.fillMode).toBe("forwards");
      expect(props.playState).toBe("running");
      expect(props.timeline).toBe("alternate");
    });
  });

  describe(".prototype.toString", () => {
    it("should correctly return string format for the animations properties", () => {
      const props = new AnimationProperties(defaultProps, {
        name: "fadeIn",
        duration: "1.7s",
        timingFunction: "ease-in",
        delay: "0.574s",
        iterationCount: "infinite",
        direction: "reverse",
        fillMode: "forwards",
        playState: "running",
        timeline: "alternate",
      });

      expect(props.toString()).toBe(
        "fadeIn 1.7s ease-in 0.574s infinite reverse forwards running alternate"
      );
    });
  });

  describe(".prototype.fromAnimationExpression", () => {
    (
      [
        [
          "    animationName  +123s     -456ms    789x    ",
          {
            name: "animationName",
            duration: "123s",
            delay: "456ms",
            iterationCount: 789,
          },
        ],
        [
          "    animationName 123.456ms   ease-in 0.574ms     infinite reverse     forwards   running   alternate    ",
          {
            name: "animationName",
            duration: "123.456ms",
            timingFunction: "ease-in",
            delay: "0.574ms",
            iterationCount: "infinite",
            direction: "reverse",
            fillMode: "forwards",
            playState: "running",
            timeline: "alternate",
          },
        ],
        [
          "animationName",
          {
            name: "animationName",
            duration: defaultProps.duration,
            timingFunction: defaultProps.timingFunction,
            delay: defaultProps.delay,
            iterationCount: defaultProps.iterationCount,
            direction: defaultProps.direction,
            fillMode: defaultProps.fillMode,
            playState: defaultProps.playState,
            timeline: "",
          },
        ],
        [
          "animationName 1x",
          {
            name: "animationName",
            iterationCount: 1,
          },
        ],
        [
          "animationName 1.7s ease-in 0.574s infinite reverse forwards running alternate",
          {
            name: "animationName",
            duration: "1.7s",
            timingFunction: "ease-in",
            delay: "0.574s",
            iterationCount: "infinite",
            direction: "reverse",
            fillMode: "forwards",
            playState: "running",
            timeline: "alternate",
          },
        ],
        // duration
        [
          "animationName +123s",
          {
            name: "animationName",
            duration: "123s",
          },
        ],
        [
          "animationName +123.456s",
          {
            name: "animationName",
            duration: "123.456s",
          },
        ],
        [
          "animationName +123ms",
          {
            name: "animationName",
            duration: "123ms",
          },
        ],
        [
          "animationName +123.456ms",
          {
            name: "animationName",
            duration: "123.456ms",
          },
        ],
        // delay
        [
          "animationName -123s",
          {
            name: "animationName",
            delay: "123s",
          },
        ],
        [
          "animationName -123.456s",
          {
            name: "animationName",
            delay: "123.456s",
          },
        ],
        [
          "animationName -123ms",
          {
            name: "animationName",
            delay: "123ms",
          },
        ],
        [
          "animationName -123.456ms",
          {
            name: "animationName",
            delay: "123.456ms",
          },
        ],
        // iterationCount
        [
          "animationName 123x",
          {
            name: "animationName",
            iterationCount: 123,
          },
        ],
        [
          "animationName 123.456x",
          {
            name: "animationName",
            iterationCount: 123.456,
          },
        ],
        // multiple (animationName and 2 permutations of duration, delay, iterationCount)
        [
          "animationName +123s -456ms",
          {
            name: "animationName",
            duration: "123s",
            delay: "456ms",
          },
        ],
        [
          "animationName -456ms +123s",
          {
            name: "animationName",
            duration: "123s",
            delay: "456ms",
          },
        ],
        [
          "animationName +123s 789x",
          {
            name: "animationName",
            duration: "123s",
            iterationCount: 789,
          },
        ],
        [
          "animationName 789x +123s",
          {
            name: "animationName",
            duration: "123s",
            iterationCount: 789,
          },
        ],
        [
          "animationName -456ms 789x",
          {
            name: "animationName",
            delay: "456ms",
            iterationCount: 789,
          },
        ],
        [
          "animationName 789x -456ms",
          {
            name: "animationName",
            delay: "456ms",
            iterationCount: 789,
          },
        ],
        // multiple (animationName and 3 permutations of duration, delay, iterationCount)
        [
          "animationName +123s -456ms 789x",
          {
            name: "animationName",
            duration: "123s",
            delay: "456ms",
            iterationCount: 789,
          },
        ],
        [
          "animationName +123s 789x -456ms",
          {
            name: "animationName",
            duration: "123s",
            delay: "456ms",
            iterationCount: 789,
          },
        ],
        [
          "animationName -456ms +123s 789x",
          {
            name: "animationName",
            duration: "123s",
            delay: "456ms",
            iterationCount: 789,
          },
        ],
        [
          "animationName -456ms 789x +123s",
          {
            name: "animationName",
            duration: "123s",
            delay: "456ms",
            iterationCount: 789,
          },
        ],
        [
          "animationName 789x +123s -456ms",
          {
            name: "animationName",
            duration: "123s",
            delay: "456ms",
            iterationCount: 789,
          },
        ],
        [
          "animationName 789x -456ms +123s",
          {
            name: "animationName",
            duration: "123s",
            delay: "456ms",
            iterationCount: 789,
          },
        ],
      ] as [string, Partial<AnimationProperties>][]
    ).forEach(([raw, parsed]) => {
      it(`should correctly parse animation expression "${raw}"`, () => {
        const props = AnimationProperties.fromAnimationExpression(
          defaultProps,
          raw
        );

        expect(props).toEqual(expect.objectContaining(parsed));
      });
    });
  });
});

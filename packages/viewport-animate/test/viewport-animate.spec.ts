/**
 * @jest-environment jsdom
 */

import { describe, expect, it, afterEach, beforeEach, vi } from "vitest";
import {
  AnimationPlayKind,
  AnimationProperties,
  ViewportAnimate,
  type ViewportAnimateOptions,
} from "../src/index.js";
import "@testing-library/jest-dom/vitest";

const mockIntersectionObserver = class {
  constructor () { }
  observe () { }
  unobserve () { }
  disconnect () { }
} as unknown as typeof IntersectionObserver;

describe("ViewportAnimate", () => {
  let viewportAnimate: ViewportAnimate;
  let defaultOptions: Partial<ViewportAnimateOptions>;
  let mockElement: HTMLElement;

  beforeEach(() => {
    defaultOptions = {
      attribute: "data-va",
      observerThreshold: 0.01,
      defaultAnimationProperties: {},
    };
    viewportAnimate = new ViewportAnimate(defaultOptions);

    mockElement = document.createElement("div");
    mockElement.setAttribute("data-va", "fadeIn +1s -553ms 2.5x");
    document.body.appendChild(mockElement);

    window.IntersectionObserver = mockIntersectionObserver;
  });

  afterEach(() => {
    document.body.removeChild(mockElement);
  });

  it("should be a class", () => {
    expect(ViewportAnimate).toBeInstanceOf(Function);
    expect(ViewportAnimate.prototype.constructor).toBeInstanceOf(Function);
  });

  describe(".prototype.constructor", () => {
    it("should override default options with provided options", () => {
      const customOptions = { attribute: "data-custom" };
      const customViewportAnimate = new ViewportAnimate(customOptions);

      expect(customViewportAnimate["options"].attribute).toBe("data-custom");
    });
  });

  describe(".prototype.init", () => {
    it("should set up observers for elements with the specified attribute", () => {
      const observeSpy = vi.spyOn(IntersectionObserver.prototype, "observe");

      viewportAnimate.init();
      expect(observeSpy).toHaveBeenCalledWith(mockElement);
    });
  });

  describe(".prototype.animate", () => {
    it("should apply animation style to the target element", () => {
      const entry = {
        target: mockElement,
      } as unknown as IntersectionObserverEntry;
      const animationData = {
        animation: new AnimationProperties(
          {},
          { name: "fadeIn", duration: "1s", timingFunction: "ease-in" }
        ),
        animationPlayKind: AnimationPlayKind.ONCE,
        thresholds: [0.5],
      };

      viewportAnimate["animate"](entry, animationData);
      expect(mockElement.style.animation).toContain("fadeIn 1s ease-in");
    });

    it("should set animationIterationCount to infinite for AnimationPlayKind.INFINITE", () => {
      const entry = {
        target: mockElement,
      } as unknown as IntersectionObserverEntry;
      const animationData = {
        animation: new AnimationProperties(
          {},
          { name: "fadeIn", duration: "1s", timingFunction: "ease-in" }
        ),
        animationPlayKind: AnimationPlayKind.INFINITE,
        thresholds: [0.5],
      };

      viewportAnimate["animate"](entry, animationData);
      expect(mockElement.style.animationIterationCount).toBe("infinite");
    });
  });

  describe(".prototype.resolveAnimationData", () => {
    it("should return null for empty animation expressions", () => {
      const result = viewportAnimate["resolveAnimationData"]("");

      expect(result).toBeNull();
    });

    it("should parse animation expression correctly", () => {
      [
        {
          raw: "@0.2,0.5 fadeIn +2.7s -331ms 1.5x", expected:
          {
            animationPlayKind: AnimationPlayKind.ONCE,
            animation: {
              name: "fadeIn",
              delay: "331ms",
              duration: "2.7s",
              iterationCount: 1.5,
            },
            thresholds: [0.2, 0.5],
          }
        },
        {
          raw: "*0.07 jello", expected:
          {
            animationPlayKind: AnimationPlayKind.REPLAY,
            animation: {
              name: "jello",
              delay: "0s",
              duration: "1s",
              iterationCount: 1,
            },
            thresholds: [0.07],
          }
        },
        {
          raw: "!0.5 fadeIn +100ms", expected:
          {
            animationPlayKind: AnimationPlayKind.INFINITE,
            animation: {
              name: "fadeIn",
              delay: "0s",
              duration: "100ms",
              iterationCount: 1,
            },
            thresholds: [0.5],
          }
        },
        {
          raw: "fadeIn 1s ease-in 20ms", expected:
          {
            animationPlayKind: AnimationPlayKind.ONCE,
            animation: {
              name: "fadeIn",
              delay: "20ms",
              duration: "1s",
              iterationCount: 1,
              timingFunction: "ease-in",
            },
            thresholds: defaultOptions.observerThreshold,
          }
        },
      ].forEach(({ raw, expected }) => {
        const result = viewportAnimate["resolveAnimationData"](raw);

        expect(result).toEqual({ ...expected, animation: expect.objectContaining(expected.animation) });
      });
    });
  });

  describe(".prototype.parseObserverThresholds", () => {
    it("should return default threshold when no valid thresholds are provided", () => {
      const result = viewportAnimate["parseObserverThresholds"]("");
      expect(result).toBe(defaultOptions.observerThreshold);
    });

    it("should parse threshold expressions into an array of numbers", () => {
      const result = viewportAnimate["parseObserverThresholds"]("0.2,0.5");
      expect(result).toEqual([0.2, 0.5]);
    });
  });

  describe(".prototype.parseAnimationPlayKind", () => {
    it("should return the correct AnimationPlayKind enum value", () => {
      expect(viewportAnimate["parseAnimationPlayKind"]("@")).toBe(
        AnimationPlayKind.ONCE
      );
      expect(viewportAnimate["parseAnimationPlayKind"]("*")).toBe(
        AnimationPlayKind.REPLAY
      );
      expect(viewportAnimate["parseAnimationPlayKind"]("!")).toBe(
        AnimationPlayKind.INFINITE
      );
    });

    it("should return null for invalid characters", () => {
      expect(viewportAnimate["parseAnimationPlayKind"]("x")).toBeNull();
    });
  });
});

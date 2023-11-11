import { describe, expect, it } from "vitest";
import { ViewportAnimate } from "../src/index.js";

describe("ViewportAnimate", () => {
  it("should be a class", () => {
    expect(ViewportAnimate).toBeInstanceOf(Function);
    expect(ViewportAnimate.prototype.constructor).toBeInstanceOf(Function);
  });
});

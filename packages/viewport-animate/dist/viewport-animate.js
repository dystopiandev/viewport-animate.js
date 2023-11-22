class l {
  name;
  duration;
  timingFunction;
  delay;
  iterationCount;
  direction;
  fillMode;
  playState;
  timeline;
  constructor(i, t) {
    this.name = t.name || "", this.duration = t.duration || i.duration || "1s", this.timingFunction = t.timingFunction || i.timingFunction || "ease", this.delay = t.delay || i.delay || "0s", this.iterationCount = t.iterationCount || i.iterationCount || 1, this.direction = t.direction || i.direction || "normal", this.fillMode = t.fillMode || i.fillMode || "both", this.playState = t.playState || i.playState || "running", this.timeline = t.timeline || "";
  }
  static fromAnimationExpression(i, t) {
    const n = t.trim().replace(/\s+/g, " ").split(" "), o = {
      name: n[0]
    };
    for (let s = 1; s < n.length; s++)
      if (n[s].startsWith("+")) {
        o.duration = n[s].substring(1);
        continue;
      } else if (n[s].startsWith("-")) {
        o.delay = n[s].substring(1);
        continue;
      } else if (n[s].endsWith("x")) {
        o.iterationCount || (o.iterationCount = parseFloat(n[s].slice(0, -1)));
        continue;
      } else
        return new l(
          i,
          {
            name: n[0],
            duration: n[1],
            timingFunction: n[2],
            delay: n[3],
            iterationCount: n[4],
            direction: n[5],
            fillMode: n[6],
            playState: n[7],
            timeline: n[8]
          }
        );
    return new l(
      i,
      o
    );
  }
  toString() {
    return `${this.name} ${this.duration} ${this.timingFunction} ${this.delay} ${this.iterationCount} ${this.direction} ${this.fillMode} ${this.playState} ${this.timeline}`;
  }
}
class u {
  options = {
    attribute: "data-va",
    observerThreshold: 0.01,
    defaultAnimationProperties: {}
  };
  constructor(i) {
    Object.assign(this.options, i), Object.assign(
      this.options.defaultAnimationProperties,
      new l(i?.defaultAnimationProperties ?? {}, {})
    );
  }
  init() {
    const i = document.querySelectorAll(
      `[${this.options.attribute}]`
    );
    for (let t = 0; t < i.length; t++) {
      const e = i[t];
      e.style.opacity = "0";
      const n = e.getAttribute(this.options.attribute).trim(), o = this.resolveAnimationData(n);
      o && (o.animationPlayKind === "*" && new IntersectionObserver(
        async (s) => {
          for (let r = 0; r < s.length; r++)
            s[r].isIntersecting || (e.style.opacity = "0", e.style.animation = "none");
        },
        {
          threshold: 1e-3
        }
      ).observe(e), new IntersectionObserver(
        (s, r) => {
          for (let c = 0; c < s.length; c++) {
            const h = s[c];
            h.isIntersecting && (e.style.opacity = "1", this.animate(h, o), o.animationPlayKind === "@" && r.disconnect());
          }
        },
        {
          threshold: o.thresholds
        }
      ).observe(e));
    }
  }
  animate(i, t) {
    const e = i.target;
    e.style.animation = t.animation.toString(), t.animationPlayKind === "!" && (e.style.animationIterationCount = "infinite");
  }
  resolveAnimationData(i) {
    const t = i.replace(/\s+/g, " ").trim();
    if (!t)
      return null;
    const e = this.parseAnimationPlayKind(
      t[0]
    ), n = e ? t.substring(t.indexOf(" ") + 1) : t, o = e ? this.parseObserverThresholds(
      t.substring(1).split(" ")[0]
    ) : this.options.observerThreshold;
    return {
      animationPlayKind: e ?? "@",
      animation: l.fromAnimationExpression(
        this.options.defaultAnimationProperties,
        n
      ),
      thresholds: o
    };
  }
  parseObserverThresholds(i) {
    const t = i.split(",").map((e) => parseFloat(e.trim())).filter((e) => !isNaN(e));
    return t.length < 1 ? this.options.observerThreshold : t;
  }
  parseAnimationPlayKind(i) {
    switch (i) {
      case "@":
        return "@";
      case "*":
        return "*";
      case "!":
        return "!";
      default:
        return null;
    }
  }
}
var m = /* @__PURE__ */ ((a) => (a.ONCE = "@", a.REPLAY = "*", a.INFINITE = "!", a))(m || {});
export {
  m as AnimationPlayKind,
  l as AnimationProperties,
  u as ViewportAnimate
};

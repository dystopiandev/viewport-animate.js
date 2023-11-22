import { ViewportAnimate } from '../viewport-animate/dist/viewport-animate.js';

window.addEventListener("load", () => {
  new ViewportAnimate({
    attribute: "data-va",
    observerThreshold: 0.01,
  }).init();
});
window.addEventListener("load", () => {
  new ViewportAnimate({
    attribute: "data-va",
    observerThreshold: 0.01,
  }).init();
});
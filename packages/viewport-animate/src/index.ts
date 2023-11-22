import { ViewportAnimate } from "./viewport-animate";
export * from "./animation-properties";
export * from "./viewport-animate";

declare global {
  interface Window {
    ViewportAnimate: typeof ViewportAnimate
  }
}

(() => {
  if(window) window.ViewportAnimate = ViewportAnimate;
})()
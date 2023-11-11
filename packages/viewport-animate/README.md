<h1 align="center"><b>ViewportAnimate.js</b></h1>
<p align="center">Easy and performant API for applying CSS animations when elements are scrolled into the viewport.</p>

<div align="center">

[![npm version](https://img.shields.io/npm/v/viewport-animate.svg?style=flat-square)](https://www.npmjs.org/package/viewport-animate)
[![install size](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=viewport-animate&query=$.install.pretty&label=install%20size&style=flat-square)](https://packagephobia.now.sh/result?p=viewport-animate)
[![npm downloads](https://img.shields.io/npm/dm/viewport-animate.svg?style=flat-square)](https://npm-stat.com/charts.html?package=viewport-animate)
[![Known Vulnerabilities](https://snyk.io/test/npm/viewport-animate/badge.svg)](https://snyk.io/test/npm/viewport-animate)

</div>

- [Features](#features)
- [Syntax](#syntax)
- [Installation](#installation)
- [Usage](#usage)
- [Demo](#demo)


## Features

- Non-intrusive: Uses data attribute (`data-va`) by default.
- Easily integrate with [Animate.css](https://animate.style/).
- Simple syntax for specifying duration, delay and number of iterations for each animation. Standard [CSS animation syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/animation) can be used to specify more animation properties.
- Only play animations when elements are scrolled into the viewport, with a observer thresholds.
- If desired, replay animations when elements are scrolled out of the viewport and back in.

## Syntax

The library also supports a simplified syntax for specifying duration, delay and number of iterations for each animation:
```html
attrib="<control><threshold> <animation-name> +<duration> -<delay> <iterations>x"
  ```

Example:
```html
<p data-va="*0.01 fadeIn +1.5s -750ms 2.5x">
  When the element intersects the viewport by 1% of its height,
  play the fadeIn animation with a delay of 750ms and a duration of 1.5s,
  and loop 2.5 times. Also, repeat animation when the element is scrolled out
  of the viewport and back in (*).
</p>
```

Also, Tthe complete [CSS animation syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/animation) or any shorthand that works can be used to specify animation properties:
```html
attrib="<control><threshold> <animation-name> <duration> <timing-function> <delay> <iterations> <direction> <fill-mode> <play-state> <timeline>"
```

Example:
```html
<p data-va="@0.01 fadeIn 1.5s ease 750ms 2.5 normal none running auto">
  When the element intersects the viewport by 1% of its height,
  play the fadeIn animation with a delay of 750ms and a duration of 1.5s,
  and loop 2.5 times. Do not repeat animation when the element is scrolled out
  of the viewport and back in (*).
</p>
```

- `control` is one of the following:
  - `@` - Play animation once when the element is scrolled into the viewport. This is the default if you don't specify a control.
  - `*` - Play animation everytime the element intersects the viewport.
  - `!` - Play the animation infinitely. This overrides the `iterations` value.
- `threshold` is the percentage of the element's height that must intersect the viewport before the animation is played. Default is `0.01`. See [IntersectionObserver.thresholds](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/thresholds). Multiple thresholds can be specified as a comma-separated list. e.g. `0.01,0.5,0.85`.

## Installation

Install as you would any other library with npm (or any other package manager):

```bash
npm install viewport-animate
```

## Usage

**1. Load the CSS animations you want to use**

For this guide, we go with [Animate.css](https://animate.style/). First install it:

```bash
npm install animate.css
```

Import the CSS file in your project:

```ts
import "animate.css/animate.css";
```

<details title="click to expand">
<summary>Optional step (click to expand)</summary>

One last thing, to make sure the animations are not visible before they are played, add the following CSS:

```css
[data-va] /* or whatever selector you use */
{
  opacity: 0;
}
```

If you do set the opacity to `0`. You may want to wrap the following CSS in `<noscript>` to make sure the elements are visible when JavaScript is disabled:

```css
[data-va] /* or whatever selector you use */
{
  opacity: 1 !important;
}
```

</details>

**2. Initialize the module**

```ts
import { ViewportAnimate } from "viewport-animate";

// Best to wait for the page to load before initializing
window.addEventListener("load", () => {
  // Initialize with default options
  new ViewportAnimate().init();
});
```

**3. Apply animations to elements**

Example:
```html
<p data-va="*0.01 fadeIn +1.5s -750ms 2.5x">
  When the element intersects the viewport by 1% of its height,
  play the fadeIn animation with a delay of 750ms and a duration of 1.5s,
  and loop 2.5 times. Also, repeat animation when the element is scrolled out
  of the viewport and back in (*).
</p>
```

## Demo

- [Live Demo](https://dystopian.dev/)
- [Astro project](./packages/viewport-animate-example.astro/).

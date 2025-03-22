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
  - [With a package manager](#with-a-package-manager)
    - [npm](#npm)
    - [Bun](#bun)
  - [UMD (browser global)](#umd-browser-global)
    - [Unpkg](#unpkg)
    - [JSDelivr](#jsdelivr)
- [Example Usage (Plain HTML with Unpkg CDN)](#example-usage-plain-html-with-unpkg-cdn)
- [More Examples](#more-examples)


## Features

- Non-intrusive: Uses data attribute (`data-va`) by default.
- Easily integrate with [Animate.css](https://animate.style/).
- Simple syntax for specifying duration, delay and number of iterations for each animation. Standard [CSS animation syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/animation) can be used to specify more animation properties.
- Only play animations when elements are scrolled into the viewport, with observer thresholds.
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

Both ESM and UMD builds are available.

### With a package manager

For environments like frontend frameworks (React, Vue, Svelte, Astro, etc.), you should use your preferred package manager to install the package:

#### npm

```bash
npm install viewport-animate
```

#### Bun
  
```bash
bun install viewport-animate
```

After installation, `ViewportAnimate` can be imported:

```js
import { ViewportAnimate } from "viewport-animate";
```

See the [demo Vue project](./examples/demo.vue/src/App.vue) for a complete example.

### UMD (browser global)

For direct usage in browsers (plain HTML), you can conveniently load the UMD build directly from a CDN and `ViewportAnimate` will be available as `window.ViewportAnimate`:

#### Unpkg
```html
<script src="https://unpkg.com/viewport-animate/umd.js"></script>
```

#### JSDelivr
```html
<script src="https://cdn.jsdelivr.net/npm/viewport-animate/umd.js"></script>
```

See the [demo HTML project](./examples/demo.html/index.html) for a complete example.

## Example Usage (Plain HTML with Unpkg CDN)

Setup the CSS first. Load the animations from Animate.css via a CDN:

```html
<link rel="stylesheet" href="https://unpkg.com/animate.css/animate.min.css" />
```

To ensure the animations are not visible before they are played, add the following CSS:

```css
/* style.css */

[data-va] /* or whatever selector you use */
{
  opacity: 0;
}
```

... which you typically import as:

```html
<link rel="stylesheet" href="styles.css" />
```

To ensure the elements are visible when JavaScript is disabled, add a separate CSS file:

```css
/* no-js-style.css */

[data-va] /* or whatever selector you use */
{
  opacity: 1 !important;
}
```

... which you typically import as:

```html
<noscript>
  <link rel="stylesheet" href="no-js-styles.css" />
</noscript>
```

Next, import the module from a CDN:

```html
<script src="https://unpkg.com/viewport-animate/umd.js"></script>
```

... and then load the module:

```html
<script>
  // Best to wait for the page to load before initializing
  window.addEventListener("load", () => {
    // Initialize with default options
    new ViewportAnimate({
      // if you change this, make sure to update the CSS selector above
      // and the data attribute below
      attribute: "data-va",

      // if threshold is unspecified in animation expression, then fallback
      // to when the element intersects the viewport by 1% of its height
      observerThreshold: 0.01,
    }).init();
  });
</script>
```

Finally, add the `data-va` attribute to the elements you want to animate:

Example:
```html
<p data-va="*0.01 fadeIn +1.5s -750ms 2.5x">
  When the element intersects the viewport by 1% of its height,
  play the fadeIn animation with a delay of 750ms and a duration of 1.5s,
  and loop 2.5 times. Also, repeat animation when the element is scrolled out
  of the viewport and back in (*).
</p>
```

## More Examples

- [Live Astro Demo](https://dystopian.dev/)
- [Astro project](./examples/demo.astro/)
- [React project](./examples/demo.html/)
- [Vue project](./examples/demo.vue/)
- [HTML project](./examples/demo.html/)

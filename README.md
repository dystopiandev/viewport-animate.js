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
- Simply specify of duration, delay and number of iterations for each animation.
- Only play animations when elements are scrolled into the viewport, with a observer thresholds.
- If desired, replay animations when elements are scrolled out of the viewport and back in.

## Syntax

  ```html
  attrib="<control><threshold> <animation-name> <duration> <delay> <iterations>"
  ```

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

Follow the README in the [example Astro project](./packages/viewport-animate-example.astro/).

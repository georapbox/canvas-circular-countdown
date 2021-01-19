[![npm version](https://img.shields.io/npm/v/canvas-circular-countdown.svg)](https://www.npmjs.com/package/canvas-circular-countdown)
[![dependencies Status](https://status.david-dm.org/gh/georapbox/canvas-circular-countdown.svg)](https://david-dm.org/georapbox/canvas-circular-countdown)
[![devDependencies Status](https://status.david-dm.org/gh/georapbox/canvas-circular-countdown.svg?type=dev)](https://david-dm.org/georapbox/canvas-circular-countdown?type=dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://georapbox.mit-license.org/@2018)

# canvas-circular-countdown

Draw a configurable circular canvas countdown timer.

Check [here](https://georapbox.github.io/canvas-circular-countdown/) for a live demo.

## Install

```sh
$ npm install canvas-circular-countdown --save
```

## Usage

The library is exported in UMD (Universal Module Definition) format. You can import it the following ways:

### Old school browser global
```html
<script src="https://unpkg.com/canvas-circular-countdown@<VERSION_GOES_HERE>/dist/CanvasCircularCountdown.min.js"></script>
```

### Using ESM import statement

```js
import CanvasCircularCountdown from 'canvas-circular-countdown';
```

### Using CommonJS require statement

```js
const CanvasCircularCountdown = require('canvas-circular-countdown');
```

## API

### Instantiation

```js
new CanvasCircularCountdown(element, [options], [onTimerRunning])
```

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | (Required) The element that the countdown is drawn to. If is a `canvas` element, the countdown will be drawn on it; otherwise a `canvas`  element will be created and appended to `element`. |
| [options] | <code>Object</code> | (Optional) Options that can be overriden by user. See below for more details about each option. |
| [onTimerRunning] | <code>Function</code> | (Optional) Function to be executed while timer is running. Parameters passed by include the percentage remaining, an object containing the remaining and elapsed time and the `CanvasCircularCountdown` instance. |

### Options

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| duration | <code>Number</code> | `60 * 1000` | The timer's duration in milliseconds. |
| radius | <code>Number</code> | `150` | The radius of the circular countdown in pixels. |
| progressBarWidth | <code>Number</code> | `15` | The circular progress bar in pixels. |
| progressBarOffset | <code>Number</code> | `5` | The number of pixels that will be left between the edges of the progress bar and the rest of the circle. |
| circleBackgroundColor | <code>String</code> | `#ffffff` | The background color of the main circle. |
| emptyProgressBarBackgroundColor | <code>String</code> | `#dddddd` | The background color of the progress bar when is empty. |
| filledProgressBarBackgroundColor<sup>1</sup> | <code>String\|Function</code> | `#00bfeb` | The background color of the progress bar when is filled. |
| captionText<sup>1</sup> | <code>String\|Function</code> | `undefined` | The text to be displayed as caption inside the countdown circle. By default if it is left as `undefined` and `showCaption` is set to true, the remaining percentage will be displayed. |
| captionColor<sup>1</sup> | <code>String\|Function</code> | `#343a40` | The foreground color of the caption string. |
| captionFont<sup>1</sup> | <code>String\|Function</code> | `20px sans-serif` | The text style of the caption string. Check [here](https://developer.mozilla.org/en-US/docs/Web/CSS/font) for available values. |
| showCaption<sup>1</sup> | <code>Boolean\|Function</code> | `true` | Whether the caption text inside the countdown circle will be displayed or not. |
| draw | <code>Function</code> | <code>undefined</code> | A function that exposes `CanvasRenderingContext2D` to allow free drawing on the canvas element. The function is called with 2 arguments. The first argument is the `CanvasRenderingContext2D` and the second is an object with information like the canvas width/height, the remaining percentage and an object containing the remaining and elapsed time. |
| throttle | <code>Number</code> | `undefined` | Throttle duration in milliseconds. Must be a number lower or equal to the `duration` option. If provided, it limits the number of times the canvas is drawn in the given period, therefore the number of times the callback function `onTimerRunning` can be called. You can use it if you perform heavy tasks inside the `onTimerRunning` callback function to improve performance. Always prefer small numbers, eg. 250, etc |

<sup>1</sup> *If it is a function, the remaining percentage and an object containing the remaining and elapsed time are passed as parameters and it should return the appropriate type for each option. For example, for `showCaption` should return a boolean (true or false), but for `captionColor` should return a string. Useful when  you need to change some options' values depending on the remaining percentage or the remaining/elapsed time.*

### Instance methods

```js
start() => CanvasCircularCountdown
```

Start the timer. If the timer has been already started, the timer will just resume.

```js
stop() => CanvasCircularCountdown
```

Stop/Pause the timer.

```js
reset() => CanvasCircularCountdown
```

Resets the timer to initial specified duration.

```js
style(options = {}) => CanvasCircularCountdown
```

Change the styles of the circular countdown at any time while te timer running.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> | `{}` | Any of the options provided above can be changed apart from the `duration` and `throttle` options. |

## Examples

### Example 1 - Default configuration

Create a new instance of `CanvasCircularCountdown` with the default configuration and immediately start the countdown timer. Pause the countdown after 5 seconds have passed.

#### HTML

```html
<canvas id="countdown-canvas"></canvas>
```

#### Javascript

```js
new CanvasCircularCountdown(document.getElementById('countdown-canvas'), (percentage, time, instance) => {
  if (time.elapsed >= 5000) {
    instance.stop();
  }
}).start();
```

### Example 2 - Custom configuration

Same as the above example, but with custom configuration.

#### HTML

```html
<canvas id="countdown-canvas"></canvas>
```

#### Javascript

```js
new CanvasCircularCountdown(document.getElementById('countdown-canvas'), {
  duration: 30 * 1000,
  radius: 200,
  progressBarWidth: 20,
  progressBarOffset: 0,
  circleBackgroundColor: '#f5f5f5',
  emptyProgressBarBackgroundColor: '#b9c1c7',
  filledProgressBarBackgroundColor: '#17a2b8',
  captionColor: '#6c757d',
  captionFont: '22px serif',
  showCaption: true
}, (percentage, time, instance) => {
  if (time.elapsed >= 5000 ) {
    instance.stop();
  }
}).start();
```

### Example 3 - Change progress bar and caption string color depending on percentage remaining

#### HTML

```html
<canvas id="countdown-canvas"></canvas>
```

#### Javascript

```js
const pickColorByPercentage = (percentage, time) => {
  switch (true) {
    case percentage >= 75:
      return '#28a745'; // green
    case percentage >= 50 && percentage < 75:
      return '#17a2b8'; // blue
    case percentage >= 25 && percentage < 50:
      return '#ffc107'; // orange
    default:
      return '#dc3545'; // red
  }
}

new CanvasCircularCountdown(document.getElementById('countdown-canvas'), {
  filledProgressBarBackgroundColor: pickColorByPercentage,
  captionColor: pickColorByPercentage
}).start();
```

### Example 4 - Responsive canvas

#### HTML

```html
<div id="countdown-container">
  <canvas id="countdown-canvas"></canvas>
</div>
```

#### CSS

```CSS
#countdown-container {
  width: 100%;
  max-width: 500px;
}
```

#### Javascript

```js
const containerEl = document.getElementById('countdown-container');
const countdownEl = document.getElementById('countdown-canvas');

const countdown = new CanvasCircularCountdown(countdownEl, {
  radius: containerEl.getBoundingClientRect().width / 2
}).start();

let resizeTimeout;

window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);

  resizeTimeout = setTimeout(() => {
    countdownEl.style({
      radius: containerEl.getBoundingClientRect().width / 2
    });
  }, 250);
```

### Example 5 - Change caption text depending on percentage

```HTML
<canvas id="countdown-canvas"></canvas>
```

```JS
new CanvasCircularCountdown(document.getElementById('countdown-canvas'), {
  captionText: percentage => {
    if (percentage <= 25) {
      return 'Time is running out!';
    }

    return 'There is time. Don\'t worry!';
  }
}).start();
```

### Example 6 - Free draw on canvas element

```HTML
<canvas id="countdown-canvas"></canvas>
```

```JS
new CanvasCircularCountdown(document.getElementById('countdown-canvas'), {
  draw: (ctx, opts) => {
    // Draw a in the centre of the canvas element,
    // with radius being 1/4 of the canvas width.
    ctx.save();
    ctx.beginPath();
    ctx.arc(opts.width / 2, opts.height / 2, opts.width / 4, 0, 4 * Math.PI, false);
    ctx.lineWidth = 5;
    ctx.strokeStyle = opts.percentage >= 50 ? '#008000' : '#ff0000'; // change color according to percentage
    ctx.stroke();
    ctx.restore();
  }
}).start();
```

## License

[The MIT License (MIT)](https://georapbox.mit-license.org/@2018)

# canvas-circular-countdown

Draw a configurable circular canvas countdown timer

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
| progressBarWidth | <code>Number</code> | `10` | The circular progress bar in pixels. |
| progressBarOffset | <code>Number</code> | `5` | The number of pixels that will be left between the edges of the progress bar and the rest of the circle. |
| circleBackgroundColor | <code>String</code> | `#ffffff` | The background color of the main circle. |
| emptyProgressBarBackgroundColor | <code>String</code> | `#dddddd` | The background color of the progress bar when is empty. |
| filledProgressBarBackgroundColor | <code>String\|Function</code> | `#00bfeb` | The background color of the progress bar when is filled. If it is a function, the remaining percentage and an object containing the remaining and elapsed time are passed as parameters and it should return a string for color. Useful when  you need to change the color of the progress bar depending on the remaining percentage or the remaining/elapsed time. |
| showPercentage | <code>Boolean</code> | `true` | Whether the remaining percentage will be displayed or not. |
| percentageColor | <code>String\|Function</code> | `#343a40` | The foreground color of the percentage string. If it is a function, the remaining percentage and an object containing the remaining and elapsed time are passed as parameters and it should return a string for color. Useful when  you need to change the color of the percentage string depending on the remaining percentage or the remaining/elapsed time. |
| percentageFontFamily | <code>String</code> | `sans-serif` | The font family of the percentage string. |
| percentageFontSize | <code>String</code> | `20px` | The font size of the percentage string. |

### Instance methods

```js
start([shouldReset = false]) => CanvasCircularCountdown
```

Start the timer. If the timer has been already started, the timer will just resume.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [shouldReset] | <code>Boolean</code> | `false` | If set to `true`, the timer will reset to initial specified duration. |

```js
stop() => CanvasCircularCountdown
```

Stop/Pause the timer.

```js
reset([shouldStop = false]) => CanvasCircularCountdown
```

Resets the timer to initial specified duration.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [shouldStop] | <code>Boolean</code> | `false` | If set to `true`, the timer will be forced to stop; otherwise will reset and continue running. |

```js
style(options = {}) => CanvasCircularCountdown
```

Change the styles of the circular countdown at any time while te timer running.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> | `{}` | Any of the options provided above can be changed apart from the `duration`. |

## Examples

### Example 1 - Default configuration

Create a new instance of `CanvasCircularCountdown` with the default configuration and immediately start the countdown timer. Pause the countdown after 5 seconds have passed.

#### HTML

```html
<canvas id="countdown-canvas"></canvas>
```

#### Javascript

```js
new CanvasCircularCountdown(document.getElementById('countdown-canvas'), (percentage, time) => {
  if (time.elapsed >= 5000 ) {
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
  showPercentage: true,
  percentageColor: '#6c757d',
  percentageFontFamily: 'sans-serif',
  percentageFontSize: '22px'
}, (percentage, time) => {
  if (time.elapsed >= 5000 ) {
    instance.stop();
  }
}).start();
```

### Example 3 - Change progress bar and percentage string color depending on percentage remaining

#### HTML

```html
<canvas id="countdown-canvas"></canvas>
```

#### Javascript

```js
const pickColorByPercentage = (percentage, time) => {
  const prc = Math.ceil(percentage);

  switch (true) {
    case prc >= 75:
      return '#28a745'; // green
    case prc >= 50 && prc < 75:
      return '#17a2b8'; // blue
    case prc >= 25 && prc < 50:
      return '#ffc107'; // orange
    default:
      return '#dc3545'; // red
  }
}

new CanvasCircularCountdown(document.getElementById('countdown-canvas'), {
  filledProgressBarBackgroundColor: pickColorByPercentage,
  percentageColor: pickColorByPercentage
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

## License

[The MIT License (MIT)](https://georapbox.mit-license.org/@2018)

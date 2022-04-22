import Timer from './timer';
import drawCanvas from './drawCanvas';
import makeHighResCanvas from './makeHighResCanvas';
import normalise from './utils/normalise';
import throttle from './utils/throttle';

export default class CanvasCircularCountdown {
  constructor(element, options, onTimerRunning) {
    const defaults = {
      duration: 60 * 1000, // ms
      radius: 150,
      elapsedTime: 0,
      progressBarWidth: 15,
      progressBarOffset: 5,
      circleBackgroundColor: '#ffffff',
      emptyProgressBarBackgroundColor: '#dddddd',
      filledProgressBarBackgroundColor: '#00bfeb',
      showCaption: true,
      captionColor: '#343a40',
      captionFont: '20px sans-serif'
    };

    if (typeof options === 'function') {
      onTimerRunning = options;
      options = {};
    }

    this.options = { ...defaults, ...options };

    if (typeof this.options.duration !== 'number' || Number.isNaN(this.options.duration)) {
      throw new TypeError('Expected a number for "duration"');
    }

    if (typeof this.options.elapsedTime !== 'number' || Number.isNaN(this.options.elapsedTime)) {
      throw new TypeError('Expected a number for "elapsedTime"');
    }

    if (this.options.duration < 0) {
      this.options.duration = 0;
    }

    if (this.options.elapsedTime > this.options.duration) {
      this.options.elapsedTime = this.options.duration;
    }

    if (this.options.elapsedTime < 0) {
      this.options.elapsedTime = 0;
    }

    if (element.nodeName === 'CANVAS') {
      this._canvas = element;
    } else {
      const canvas = document.createElement('canvas');
      element.appendChild(canvas);
      this._canvas = canvas;
    }

    const timerCallback = timer => {
      const percentage = normalise(timer.time().remaining, 0, this.options.duration) * 100 || 0;

      drawCanvas(percentage, this);

      if (typeof onTimerRunning === 'function') {
        onTimerRunning(Math.ceil(percentage), timer.time(), this);
      }
    };

    const shouldThrottle = typeof this.options.throttle === 'number'
      && !Number.isNaN(this.options.throttle)
      && this.options.throttle <= this.options.duration;

    this._timer = new Timer(this.options.duration, this.options.elapsedTime, shouldThrottle ? throttle(timerCallback, this.options.throttle) : timerCallback);

    this._canvas.width = this.options.radius * 2;
    this._canvas.height = this.options.radius * 2;
    this._ctx = makeHighResCanvas(this._canvas);

    const percentage = normalise(this._timer.time().remaining, 0, this.options.duration) * 100 || 0;

    drawCanvas(percentage, this);
  }

  style(options = {}) {
    try {
      delete options.duration;
    } catch (error) {}

    const defaults = { ...this.options };

    this.options = {
      duration: this.options.duration,
      ...defaults,
      ...options
    };

    const percentage = normalise(this._timer.time().remaining, 0, this.options.duration) * 100 || 0;

    this._canvas.width = this.options.radius * 2;
    this._canvas.height = this.options.radius * 2;
    this._ctx = makeHighResCanvas(this._canvas);

    drawCanvas(percentage, this);

    return this;
  }

  start() {
    if (this.options.duration === 0) {
      return this;
    }
    this._timer.start(false);
    return this;
  }

  stop() {
    this._timer.stop();
    return this;
  }

  reset() {
    this._timer.reset(true);
    const percentage = normalise(this._timer.time().remaining, 0, this.options.duration) * 100 || 0;
    drawCanvas(percentage, this);
    return this;
  }
}

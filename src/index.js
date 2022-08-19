import Timer from './timer';
import drawCanvas from './drawCanvas';
import makeHighResCanvas from './makeHighResCanvas';
import normalise from './utils/normalise';
import throttle from './utils/throttle';

export default class CanvasCircularCountdown {
  constructor(element, options, onTimerRunning) {
    const defaults = {
      duration: 60 * 1000, // ms
      elapsedTime: 0, // ms
      radius: 150,
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

    this.setDuration(this.options.duration);
    this.setElapsedTime(this.options.elapsedTime);

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

  setDuration(duration) {
    if (typeof duration !== 'number' || Number.isNaN(duration)) {
      throw new TypeError('Expected a number for "duration"');
    }

    if (duration < 0) {
      duration = 0;
    }

    this.options.duration = duration;

    if (this._timer) {
      this._timer.setDuration(duration);
    }
  }

  setElapsedTime(elapsedTime) {
    if (typeof elapsedTime !== 'number' || Number.isNaN(elapsedTime)) {
      throw new TypeError('Expected a number for "elapsedTime"');
    }

    if (elapsedTime > this.options.duration) {
      elapsedTime = this.options.duration;
      console.log(elapsedTime);
    }

    if (elapsedTime < 0) {
      elapsedTime = 0;
    }

    this.options.elapsedTime = elapsedTime;

    if (this._timer) {
      this._timer.setElapsedTime(elapsedTime);
    }
  }

  style(options = {}) {
    const defaults = { ...this.options };

    this.options = {
      ...defaults,
      ...options,
      duration: this.options.duration,
      elapsedTime: this.options.elapsedTime,
      throttle: this.options.throttle
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

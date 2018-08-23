import Timer from '@georapbox/timer';
import drawCanvas from './drawCanvas';
import makeHighResCanvas from './makeHighResCanvas';
import normalise from './utils/normalise';

export default class CanvasCircularCountdown {
  constructor(element, options, callback) {
    const defaults = {
      duration: 10 * 1000, // ms
      radius: 150,
      barWidth: 10,
      barOffset: 5,
      bgColor: '#ffffff',
      emptyBarBgColor: '#dddddd',
      filledBarBgColor: '#00bfeb',
      percentageFgColor: '#000000',
      percentageFontSize: '20px',
      percentageFontFamily: 'sans-serif',
      showPercentage: true
    };

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    this.options = { ...defaults, ...options };

    if (element.nodeName === 'CANVAS') {
      this._canvas = element;
    } else {
      const canvas = document.createElement('canvas');
      element.appendChild(canvas);
      this._canvas = canvas;
    }

    this._timer = new Timer(this.options.duration, timer => {
      const percentage = normalise(timer.time().remaining, 0, this.options.duration) * 100;
      drawCanvas(percentage, this);
      callback && callback(percentage, timer.time(), element);
    });

    this._canvas.width = this.options.radius * 2;
    this._canvas.height = this.options.radius * 2;
    this._ctx = makeHighResCanvas(this._canvas);

    drawCanvas(100, this);
  }

  style(options) {
    try {
      delete options.duration;
    } catch (error) {}

    const defaults = { ...this.options };

    this.options = {
      duration: this.options.duration,
      ...defaults,
      ...options
    };

    const percentage = normalise(this._timer.time().remaining, 0, this.options.duration) * 100;

    this._canvas.width = this.options.radius * 2;
    this._canvas.height = this.options.radius * 2;
    this._ctx = makeHighResCanvas(this._canvas);

    drawCanvas(percentage, this);

    return this;
  }

  start(shouldReset = false) {
    this._timer.start(shouldReset);
    return this;
  }

  stop() {
    this._timer.stop();
    return this;
  }

  reset(shouldStop = false) {
    this._timer.reset(shouldStop);
    return this;
  }
}

import Timer from '@georapbox/timer';
import drawCanvas from './drawCanvas';
import normalise from './utils/normalise';

export default class CanvasCircularCountdown {
  constructor(element, options, callback) {
    const defaults = {
      duration: 10 * 1000,
      radius: 150,
      barWidth: 10,
      barOffset: 10,
      bgColor: '#ffffff',
      emptyBarBgColor: '#dddddd',
      filledBarBgColor: '#00bfeb',
      percentageFgColor: '#000000',
      percentageFontSize: '20px',
      percentageFontFamily: 'sans-serif',
      showPercentage: true,
      autoDraw: true
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
      callback && callback(percentage, timer.time(), element);
      drawCanvas(percentage, this);
    });

    this._ctx = this._canvas.getContext('2d');
    this._canvas.width = this.options.radius * 2;
    this._canvas.height = this.options.radius * 2;

    if (this.options.autoDraw) {
      drawCanvas(100, this);
    }
  }

  draw(settings) {
    try {
      delete settings.duration;
    } catch (error) {}

    const defaults = { ...this.options };

    this.options = {
      duration: this.options.duration,
      ...defaults,
      ...settings
    };

    const percentage = normalise(this._timer.time().remaining, 0, this.options.duration) * 100;

    this._canvas.width = this.options.radius * 2;
    this._canvas.height = this.options.radius * 2;

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

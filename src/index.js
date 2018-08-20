import Timer from '@georapbox/timer';
import drawArc from './drawArc';
import normalise from './utils/normalise';

export default class CanvasCircularCountdown {
  constructor(element, options, callback) {
    const defaults = {
      duration: 10 * 1000,
      radius: 150,
      arcWidth: 10,
      arcOffset: 10,
      bgColor: '#ffffff',
      emptyArcBgColor: '#dddddd',
      filledArcBgColor: '#00bfeb',
      percentageFgColor: '#000000',
      percentageFontSize: '20px',
      percentageFontFamily: 'Arial',
      showPercentage: true
    };

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    this.options = { ...defaults, ...options };

    const canvasStyles = [
      'border-radius: 50%;',
      `background-color: ${this.options.bgColor};`
    ].join(' ');

    if (element.nodeName === 'CANVAS') {
      this._canvas = element;
    } else {
      const canvas = document.createElement('canvas');
      element.style.height = `${this.options.radius * 2}px`;
      element.appendChild(canvas);
      this._canvas = canvas;
    }

    this._timer = new Timer(this.options.duration, timer => {
      const percentage = normalise(timer.time().remaining, 0, this.options.duration) * 100;
      callback && callback(percentage, timer.time(), element);
      drawArc(this, percentage);
    });

    this.options.radius = this.options.radius - this.options.arcWidth / 2 - this.options.arcOffset / 2;
    this._ctx = this._canvas.getContext('2d');
    this._canvas.width = this.options.radius * 2 + this.options.arcWidth + this.options.arcOffset;
    this._canvas.height = this.options.radius * 2 + this.options.arcWidth + this.options.arcOffset;
    this._canvas.style.cssText += canvasStyles;

    drawArc(this, 100, {
      remaining: this.options.duration
    });
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

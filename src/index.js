import Timer from '@georapbox/timer';
import normalise from './utils/normalise';
import formatMilliseconds from './utils/formatMilliseconds';

function drawArc(instance, percentage, time) {
  const { radius, lineWidth } = instance.options;
  const circleStart = 1.5 * Math.PI;
  const circleEnd = circleStart + percentage / 50 * Math.PI;
  const centerX = instance._canvas.width / 2;
  const centerY = instance._canvas.height / 2;

  instance._ctx.clearRect(0, 0, instance._canvas.width, instance._canvas.height);
  instance._ctx.beginPath();
  instance._ctx.arc(centerX, centerY, radius, circleStart, 4 * Math.PI, false);
  instance._ctx.lineWidth = lineWidth;
  instance._ctx.strokeStyle = instance.options.emptyArcBgColor;
  instance._ctx.stroke();
  instance._ctx.beginPath();
  instance._ctx.arc(centerX, centerY, radius, circleStart, circleEnd, false);
  instance._ctx.lineWidth = lineWidth;
  instance._ctx.strokeStyle = instance.options.filledArcBgColor;
  instance._ctx.stroke();

  // draw percentage
  instance._ctx.fillStyle = instance.options.fillStyle;
  instance._ctx.font = `${instance.options.fontSize} ${instance.options.fontFamily}`;
  instance._ctx.textBaseline = 'middle';
  instance._ctx.textAlign = 'center';
  instance._ctx.fillText(
    `${Math.ceil(percentage)}%`,
    // formatMilliseconds(time.remaining),
    instance._canvas.width / 2 + instance.options.offset / 2,
    instance._canvas.height / 2 + instance.options.offset / 2
  );
}

class CanvasCircularCountdown {
  constructor(element, options) {
    const defaults = {
      duration: 10 * 1000,
      radius: 150,
      lineWidth: 10,
      offset: 10,
      backgroundColor: '#ffffff',
      emptyArcBgColor: '#dddddd',
      filledArcBgColor: '#00bfeb',
      fillStyle: '#000000',
      fontSize: '24px',
      fontFamily: 'Arial'
    };

    this.options = { ...defaults, ...options };

    const canvasStyles = [
      'border-radius: 50%;',
      `background-color: ${this.options.backgroundColor};`
    ].join(' ');

    if (element.nodeName === 'CANVAS') {
      this._canvas = element;
    } else {
      const canvas = document.createElement('canvas');
      element.appendChild(canvas);
      this._canvas = canvas;
    }

    this._timer = new Timer(this.options.duration, timer => {
      const percentage = normalise(timer.time().remaining, 0, this.options.duration) * 100;
      drawArc(this, percentage, timer.time());
      // console.info(percentage);
    });

    this._ctx = this._canvas.getContext('2d');
    this._canvas.width = this.options.radius * 2 + this.options.lineWidth + this.options.offset;
    this._canvas.height = this.options.radius * 2 + this.options.lineWidth + this.options.offset;
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

export default CanvasCircularCountdown;

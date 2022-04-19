function now() {
  return window.performance ? window.performance.now() : Date.now ? Date.now() : new Date().getTime();
}

function tick(instance) {
  if (instance._started === false) {
    return;
  }

  instance._time = instance._time + now() - instance._now;
  instance.stop().start();

  if (typeof instance._callback === 'function') {
    instance._callback(instance);
  }
}

class Timer {
  /**
   * Timer constructor
   *
   * @constructor Timer
   * @param {Number} [duration] The timer's duration (ms). If left `undefined` or `0` or negative number the timer counts up instead of down.
   * @param {Function} [callback] Function to be executed while timer is running. The Timer instance is passed by as parameter.
   */
  constructor(duration, elapsed, callback) {
    this._started = false;
    this._now = 0;
    this._time = elapsed;
    this._duration = duration;
    this._callback = callback;

    if (duration < 0) {
      this._duration = 0;
    }

    if (!duration || typeof duration === 'function') {
      this._duration = 0;
      this._callback = duration;
    }
  }

  /**
   * Get the remaining and elapsed time.
   * If no duration is specified during initialization, the remaining time will always be 0.
   *
   * @memberof Timer
   * @this {Timer}
   * @returns {Object} An object that contains the remaining and the elapsed time in milliseconds.
   */
  time() {
    return {
      remaining: Math.max(0, this._duration - this._time),
      elapsed: this._time
    };
  }

  /**
   * Start the timer.
   * If the timer instance has been already started, the timer will just resume.
   *
   * @memberof Timer
   * @this {Timer}
   * @param {Boolean} [shouldReset] If set to true, the timer will reset to initial specified duration.
   * @returns {Timer} The Timer instance.
   */
  start(shouldReset) {
    if (shouldReset) {
      this.reset(true);
    }

    if (this._started || Number(this._duration) && this._time > this._duration) {
      return this;
    }

    this._started = true;
    this._now = now();
    window.requestAnimationFrame(tick.bind(this, this));
    return this;
  }

  /**
   * Stop/Pause the timer.
   *
   * @memberof Timer
   * @this {Timer}
   * @returns {Timer} The Timer instance.
   */
  stop() {
    this._started = false;
    return this;
  }

  /**
   * Resets the timer to initial specified duration.
   *
   * @memberof Timer
   * @this {Timer}
   * @param {Boolean} [shouldStop] If set to true, the timer will be forced to stop; otherwise will reset and continue running.
   * @returns {Timer} The Timer instance.
   */
  reset(shouldStop) {
    if (shouldStop) {
      this.stop();
    }

    this._time = 0;
    return this;
  }

  /**
   * Check (at any time) if the timer is running or not.
   *
   * @memberof Timer
   * @this {Timer}
   * @returns {Boolean} True if the timer is running; otherwise false.
   */
  isRunning() {
    return this._started;
  }
}

export default Timer;

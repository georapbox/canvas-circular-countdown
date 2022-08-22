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
   * @param {Number} duration The timer's duration (ms).
   * @param {Number} elapsedTime The time that has elapsed (ms).
   * @param {Function} [callback] Function to be executed while timer is running. The Timer instance is passed by as parameter.
   */
  constructor(duration, elapsedTime, callback) {
    this._started = false;
    this._now = 0;
    this._time = elapsedTime;
    this._duration = duration;
    this._defaultElapsedTime = elapsedTime;
    this._callback = callback;
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

    this._time = this._defaultElapsedTime;
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

  /**
   * Set timer's duration.
   *
   * @memberof Timer
   * @this {Timer}
   * @param {Number} duration The timer's duration (ms).
   * @returns {Timer} The Timer instance.
   */
  setDuration(duration) {
    this._duration = duration;
    return this;
  }

  /**
   * Set the timer's elapsed time.
   *
   * @memberof Timer
   * @this {Timer}
   * @param {*} time The time that has elapsed (ms).
   * @returns {Timer} The Timer instance.
   */
  setElapsedTime(time) {
    this._time = time;
    return this;
  }
}

export default Timer;

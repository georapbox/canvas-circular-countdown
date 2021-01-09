/**
 * Limits the number of times a function can be called in a given period.
 *
 * @param {function} func The function to be executed.
 * @param {Number} [wait=0] Optional. Default value is 0. Time of delay in milliseconds.
 * @throws {TypeError} If `func` is not function.
 * @returns {function} The throttled function.
 */
function throttle(func, wait) {
  let timerId, lastRan;

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function for first argument');
  }

  return function throttled(...args) {
    if (!lastRan) {
      func.apply(void 0, args);
      lastRan = Date.now();
    } else {
      clearTimeout(timerId);

      timerId = setTimeout(function () {
        if (Date.now() - lastRan >= wait) {
          func.apply(void 0, args);
          lastRan = Date.now();
        }
      }, wait - (Date.now() - lastRan) || 0);
    }
  };
}

export default throttle;

/**
 * Takes a value within a range of values and converts that value
 * to a number from 0 to 1 that indicates where it lies in that range.
 *
 * @param {Number} value The numerical value to normalise.
 * @param {Number} min The minimum value of the range of values.
 * @param {Number} max The maximum value of the range of values.
 * @throws {TypeError} If any of the arguments passed is not a number.
 * @returns {Number} The normalised value.
 */
function normalise(value, min, max) {
  if (typeof value !== 'number' || typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('"normalise" expects numbers as arguments');
  }

  return (value - min) / (max - min);
}

export default normalise;

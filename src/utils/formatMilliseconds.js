/**
 * Accepts time in milliseconds and converts to string in minutes and seconds.
 *
 * @param {Number} ms The time in milliseconds to convert.
 * @returns {String} The final string result.
 */
function formatMilliseconds(ms) {
  // const minutes = Math.floor(ms / 60000);
  // const seconds = ((ms % 60000) / 1000).toFixed(0);
  let seconds = Math.floor(ms / 1000);
  let minutes = parseInt(seconds / 60, 10);
  seconds = seconds % 60;
  minutes = minutes % 60;
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

export default formatMilliseconds;

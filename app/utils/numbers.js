/**
 * @desc returns random number in range
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 * @public
 */
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

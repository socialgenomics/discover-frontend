import { getRandomInt } from 'repositive/utils/numbers';

/**
 * @desc Randomize array element order, using Durstenfeld shuffle algorithm.
 * @public
 * @param {Array} Array to be shuffled
 * @return {Array} Shuffled array.
 */
export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

/**
 * @desc Does this value exist in this enumerable.
 * @public
 * @param {Array} list list of items to check
 * @param {?} value the value you're checking for
 * @return {Boolean} whether the item is in the list or not
 */
export function isUnique(list, value) {
  return list.every(item => item !== value);
}

/**
 * @desc Converts string to lowercase and passes the to isUnique
 * @public
 * @param {Array} list list of items to check
 * @param {String} value the value you're checking for
 * @return {Boolean} whether the item is in the list or not
 */
export function isUniqueString(list, value) {
  return isUnique(
    list.map(item => item.toLowerCase()),
    value.toLowerCase()
  )
}

/**
 * @desc returns a random element from the array
 * @param {Array} choices
 * @returns {?}
 * @public
 */
export function getRandomElement(list) {
  return list[getRandomInt(0, list.length - 1)];
}

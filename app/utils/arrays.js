/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
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

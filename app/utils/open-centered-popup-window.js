/**
 * @desc converts window param object to valid params string;
 * @param {Object} windowParams
 * @returns {String}
 */
function createWindowParamsString(windowParams) {
  return Object.keys(windowParams).map(name => `${name}=${windowParams[name]}`).join(', ');
}

/**
 * @desc calculates starting position in given dimension
 * @param {String} dimension - 'width' or 'height'
 * @param {Number} dimensionValue
 * @returns {Number} - starting position
 */
function calculateStartingPosition(dimension, dimensionValue) {
  return window.screen[dimension] / 2 - dimensionValue / 2;
}

/**
 * @desc open new popup window centered to the screen
 * @param {String} url - popup window URL
 * @param {String} title - window title
 * @param {Number} width
 * @param {Number} height
 * @private
 */
export default (url, title, width, height) => {
  const windowParams = {
    width,
    height,
    toolbar: 'no',
    location: 'no',
    directories: 'no',
    menubar: 'no',
    copyhistory: 'no',
    top: calculateStartingPosition('height', height),
    left: calculateStartingPosition('width', width)
  };

  window.open(url, title, createWindowParamsString(windowParams));
};

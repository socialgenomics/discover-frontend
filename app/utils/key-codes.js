/**
 * converts the given numeric keycode into a human readable string
 * @param {number} keyCode
 * @param {Object} codes - the object of codes and textual values
 * @returns {string} human readable value
 */
export function nameForKeyCode(keyCode, codes = specialCodes) {
  const keyCodeString = keyCode.toString();
  return codes[keyCodeString];
}

export function isSpecial(keyCode) {
  return !!nameForKeyCode(keyCode, specialCodes)
}

export const specialCodes = {
  '8': 'Backspace',
  '9': 'Tab',
  '13': 'Enter',
  '27': 'Escape',
  '32': 'Space',
  '46': 'Delete'
}

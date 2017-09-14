/**
 * converts the given numeric keycode into a human readable string
 * @param {number} keyCode 
 * @returns {string} human readable value
 */
export function nameForKeyCode(keyCode) {
  const keyCodeString = keyCode.toString();
  return {
    '8': 'Backspace',
    '13': 'Enter',
    '46': 'Delete'
  }[keyCodeString];
}

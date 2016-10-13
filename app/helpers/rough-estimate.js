import Ember from 'ember';

export function roughEstimate(value) {
  // Get digits
  // let digits = Math.floor(Math.log10(value)) + 1;
  let digits = Math.floor(log10(value)) + 1;
  // Only start at 1k
  if (digits > 3) {
    // Get digits before comma
    let m3 = digits % 3;
    // Translate 0 into 3
    m3 = m3 === 0 ? 3 : m3;
    // Turn number into array
    let arr = value.toString().split('');
    // Insert period at calculated position
    arr.splice(m3, 0, '.');
    let s = m3 > 2 ? 3 : 4;
    // Turn into string again and cut off after first comma (No rounding)
    arr = arr.join('').substr(0, s);
    // Add letter to end.
    return arr + letter(digits);
  } else {
    return value;
  }

  function letter(k) {
    if (k > 9) { return 'B'; }
    if (k > 6) { return 'M'; }
    if (k > 3) { return 'k'; } else { return ''; }
  }
  function log10(x) {
    return Math.log(x) / Math.LN10;
  }
}

export default Ember.Helper.helper(roughEstimate);

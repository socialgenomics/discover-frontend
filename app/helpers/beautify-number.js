import Ember from 'ember';

const {Helper: { helper } } = Ember;

export function beautifyNumber(number) {
  return number.toLocaleString();
}

export default helper(beautifyNumber);

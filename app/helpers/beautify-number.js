import Ember from 'ember';

const {Helper: { helper } } = Ember;

export function beautifyNumber(number) {
  return `${number}`
    .split()
    .reverse()
    .join('')
    .match(/.{1,3}/g)
    .reverse()
    .join();
}

export default helper(beautifyNumber);

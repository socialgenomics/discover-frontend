import { expect } from 'chai';
import { describe, it } from 'mocha';
import { getRandomInt } from 'repositive/utils/numbers';

describe('getRandomInt', function() {
  it('should take two numbers and return a number within that range', function() {
    for (let i = 0; i < 100; i++) {
      expect(getRandomInt(i, i * 2)).to.be.least(i);
      expect(getRandomInt(i, i * 2)).to.be.most(i * 2);
    }
  });
});

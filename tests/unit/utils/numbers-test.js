import { expect } from 'chai';
import { describe, it } from 'mocha';
import { getRandomInt } from 'repositive/utils/numbers';

describe('getRandomInt', function() {
  it('should take two numbers and return a number with that range', function() {
    expect(getRandomInt(1, 5)).to.be.least(1);
    expect(getRandomInt(1, 5)).to.be.most(5);
  });
});

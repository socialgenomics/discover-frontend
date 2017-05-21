import { expect } from 'chai';
import { describe, it } from 'mocha';
import { getRandomElement } from 'repositive/utils/arrays';

describe('getRandomElement', function() {
  it('should take an array and return an element', function() {
    expect(getRandomElement([1])).to.eql(1);
  });
});

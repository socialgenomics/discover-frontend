/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import { poisson } from 'repositive/utils/distributions';

describe('distributions', function() {
  // Replace this with your real tests.
  it('works', function() {
    let result = poisson(100);
    expect(result).to.be.ok;
  });
});

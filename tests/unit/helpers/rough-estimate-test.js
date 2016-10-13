/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import {
  roughEstimate
} from 'repositive/helpers/rough-estimate';

describe('RoughEstimateHelper', function() {
  // Replace this with your real tests.
  it('works for 4 digits', function() {
    let result = roughEstimate(4234);
    expect(result).to.eql('4.23k');
  });
});

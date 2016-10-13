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
  it('works for 4 digits', function() {
    let result = roughEstimate(4234);
    expect(result).to.eql('4.23k');
  });
  it('works for 5 digits', function() {
    let result = roughEstimate(56542);
    expect(result).to.eql('56.5k');
  });
  it('works for 6 digits', function() {
    let result = roughEstimate(123456);
    expect(result).to.eql('123k');
  });
  it('works for 7 digits', function() {
    let result = roughEstimate(2567890);
    expect(result).to.eql('2.56M');
  });
  it('return original value when less than 4 characters', function() {
    let result = roughEstimate(999);
    expect(result).to.eql(999);
  });
});

/* jshint expr:true */
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { newLabel } from 'repositive/helpers/new-label';
import moment from 'moment';

describe('newLabelHelper', function() {
  it('returns nothing for a date not within default days', function() {
    const result = newLabel(new Date('December 17, 1995'));
    expect(result).to.be.undefined;
  });

  it('should render new when no days are specified and date is within default days', function() {
    const result = newLabel(moment(new Date()).subtract(14, 'days'));
    expect(result.string).to.eql('<span class="u-tc-red u-fs0"> NEW </span>');
  });

  it('should return nothing when the date is not within the days specified', function() {
    const result = newLabel([moment(new Date()).subtract(21, 'days'), 20]);
    expect(result).to.be.undefined;
  });

  it('should return new when the date is within the days specified', function() {
    const result = newLabel([moment(new Date()).subtract(19, 'days'), 20]);
    expect(result.string).to.eql('<span class="u-tc-red u-fs0"> NEW </span>');
  });
});

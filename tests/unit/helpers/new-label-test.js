/* jshint expr:true */
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { newLabel } from 'repositive/helpers/new-label';
import moment from 'moment';

describe('newLabelHelper', function() {
  describe('date is older than days', function() {
    it('returns nothing for a date not within default days', function() {
      const result = newLabel([new Date('December 17, 1995')]);
      expect(result).to.be.undefined;
    });

    it('returns nothing when the date is not within the days specified', function() {
      const result = newLabel([moment(new Date()).subtract(21, 'days'), 20]);
      expect(result).to.be.undefined;
    });
  })

  describe('date is within days', function() {
    it('returns new when no days are specified', function() {
      const result = newLabel([moment(new Date()).subtract(14, 'days')]);
      expect(result.string).to.eql('<span class="fc-red fw-bold fs0"> NEW </span>');
    });

    it('returns new when the date is within the days specified', function() {
      const result = newLabel([moment(new Date()).subtract(19, 'days'), 20]);
      expect(result.string).to.eql('<span class="fc-red fw-bold fs0"> NEW </span>');
    });
  })
});

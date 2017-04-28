import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';

describe('Unit | Component | reputation total', function() {
  setupComponentTest('reputation-total', {
    // Specify the other units that are required for this test
    needs: ['helper:rough-estimate'],
    unit: true
  });

  describe('total', function() {
    beforeEach(function() {
      const rep = {
        quality: 0,
        verification: 0,
        ownership: 0,
        contribution: 0
      };
      this.subject().set('reputation', rep);
    });

    it('calculate correct total for all zeroes', function() {
      expect(this.subject().get('total')).to.eql(0);
    });

    it('calculate correct total for regular numbers', function() {
      this.subject().setProperties({
        'reputation.quality': 10,
        'reputation.verification': 9,
        'reputation.ownership': 60,
        'reputation.contribution': 1000
      });
      expect(this.subject().get('total')).to.eql(1079);
    });
  })
  describe('backgroundColour', function() {
    it('returns grey class when the total is zero', function() {
      const component = this.subject();
      component.set('total', 0);
      expect(component.get('backgroundColour')).to.eql('u-bc-very-light-grey');
    });

    it('returns yellow class when the total is between 1 and 10', function() {
      const component = this.subject();
      component.set('total', 1);
      expect(component.get('backgroundColour')).to.eql('u-bc-light-yellow');
      component.set('total', 10);
      expect(component.get('backgroundColour')).to.eql('u-bc-light-yellow');
    });

    it('returns teal class when the total is greater than 10', function() {
      const component = this.subject();
      component.set('total', 11);
      expect(component.get('backgroundColour')).to.eql('u-bc-light-teal');
      component.set('total', 100000);
      expect(component.get('backgroundColour')).to.eql('u-bc-light-teal');
    });
  });
});

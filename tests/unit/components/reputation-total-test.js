import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';

describe('Unit | Component | reputation total', function() {
  setupComponentTest('reputation-total', {
    needs: ['helper:rough-estimate'],
    unit: true
  });

  describe('backgroundColour', function() {
    it('returns grey class when the total is zero', function() {
      const component = this.subject();
      component.set('total', 0);
      expect(component.get('backgroundColour')).to.eql('bc-very-light-grey');
    });

    it('returns yellow class when the total is between 1 and 10', function() {
      const component = this.subject();
      component.set('total', 1);
      expect(component.get('backgroundColour')).to.eql('bc-light-yellow');
      component.set('total', 10);
      expect(component.get('backgroundColour')).to.eql('bc-light-yellow');
    });

    it('returns teal class when the total is greater than 10', function() {
      const component = this.subject();
      component.set('total', 11);
      expect(component.get('backgroundColour')).to.eql('bc-light-teal');
      component.set('total', 100000);
      expect(component.get('backgroundColour')).to.eql('bc-light-teal');
    });
  });
});

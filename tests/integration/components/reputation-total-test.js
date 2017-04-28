import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | reputation total', function() {
  setupComponentTest('reputation-total', {
    integration: true
  });
  describe('element style', function() {
    it('renders the element with the correct colour class', function() {
      this.set('reputation', {
        quality: 0,
        verification: 0,
        ownership: 0,
        contribution: 0
      })
      this.render(hbs`{{reputation-total reputation=reputation}}`);
      expect(this.$('span').hasClass('u-bc-very-light-grey')).to.be.true;
    });
  });
});

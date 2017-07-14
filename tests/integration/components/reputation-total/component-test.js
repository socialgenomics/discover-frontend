import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | reputation total', function() {
  setupComponentTest('reputation-total', {
    integration: true
  });
  describe('element style', function() {
    it('renders grey wehn 0', function() {
      this.render(hbs`{{reputation-total total=0}}`);
      expect(this.$('span').hasClass('bc-very-light-grey')).to.be.true;
    });
    it('renders yellow when between 1 and 10', function() {
      this.render(hbs`{{reputation-total total=6}}`);
      expect(this.$('span').hasClass('bc-light-yellow')).to.be.true;
    });
    it('renders teal when greater than 10', function() {
      this.render(hbs`{{reputation-total total=11}}`);
      expect(this.$('span').hasClass('bc-light-teal')).to.be.true;
    });
  });
});

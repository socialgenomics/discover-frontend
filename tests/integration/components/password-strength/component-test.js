/* jshint expr:true */
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | password strength', function() {
  setupComponentTest('password-strength', {
    integration: true
  });

  it('renders with correct class name', function() {
    this.render(hbs`{{password-strength strength="medium"}}`);
    expect(this.$('span').hasClass('c-pw-strength-level--medium')).to.be.true;
  });
});

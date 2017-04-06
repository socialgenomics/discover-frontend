import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | change password form', function() {
  setupComponentTest('change-password-form', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#change-password-form}}
    //     template content
    //   {{/change-password-form}}
    // `);

    this.render(hbs`{{change-password-form}}`);
    expect(this.$()).to.have.length(1);
  });
});

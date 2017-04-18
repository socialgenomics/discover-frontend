import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | account link', function() {
  setupComponentTest('account-link', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#account-link}}
    //     template content
    //   {{/account-link}}
    // `);

    this.render(hbs`{{account-link}}`);
    expect(this.$()).to.have.length(1);
  });
});

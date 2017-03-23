import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | user profile details', function() {
  setupComponentTest('user-profile-details', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#user-profile-details}}
    //     template content
    //   {{/user-profile-details}}
    // `);

    this.render(hbs`{{user-profile-details}}`);
    expect(this.$()).to.have.length(1);
  });
});

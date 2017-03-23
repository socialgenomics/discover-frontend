import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | user profile section', function() {
  setupComponentTest('user-profile-section', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#user-profile-section}}
    //     template content
    //   {{/user-profile-section}}
    // `);

    this.render(hbs`{{user-profile-section}}`);
    expect(this.$()).to.have.length(1);
  });
});

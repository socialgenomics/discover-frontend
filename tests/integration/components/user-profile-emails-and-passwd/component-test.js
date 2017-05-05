import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | user profile emails and passwd', function() {
  setupComponentTest('user-profile-emails-and-passwd', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#user-profile-emails-and-passwd}}
    //     template content
    //   {{/user-profile-emails-and-passwd}}
    // `);

    this.render(hbs`{{user-profile-emails-and-passwd}}`);
    expect(this.$()).to.have.length(1);
  });
});

import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | user preview', function() {
  setupComponentTest('user-preview', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#user-preview}}
    //     template content
    //   {{/user-preview}}
    // `);

    this.render(hbs`{{user-preview}}`);
    expect(this.$()).to.have.length(1);
  });
});

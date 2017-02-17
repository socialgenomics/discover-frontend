import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | radio button', function() {
  setupComponentTest('radio-button', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#radio-button}}
    //     template content
    //   {{/radio-button}}
    // `);

    this.render(hbs`{{radio-button}}`);
    expect(this.$()).to.have.length(1);
  });
});

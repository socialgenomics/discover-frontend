import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | rui/r link button', function() {
  setupComponentTest('rui/r-link-button', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#rui/r-link-button}}
    //     template content
    //   {{/rui/r-link-button}}
    // `);

    this.render(hbs`{{rui/r-link-button}}`);
    expect(this.$()).to.have.length(1);
  });
});

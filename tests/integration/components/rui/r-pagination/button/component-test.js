import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | rui/r pagination/button', function() {
  setupComponentTest('rui/r-pagination/button', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#rui/r-pagination/button}}
    //     template content
    //   {{/rui/r-pagination/button}}
    // `);

    this.render(hbs`{{rui/r-pagination/button}}`);
    expect(this.$()).to.have.length(1);
  });
});

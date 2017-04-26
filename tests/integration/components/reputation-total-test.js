import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | reputation total', function() {
  setupComponentTest('reputation-total', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#reputation-total}}
    //     template content
    //   {{/reputation-total}}
    // `);

    this.render(hbs`{{reputation-total}}`);
    expect(this.$()).to.have.length(1);
  });
});

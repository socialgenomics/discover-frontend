import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | nested navigation', function() {
  setupComponentTest('nested-navigation', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#nested-navigation}}
    //     template content
    //   {{/nested-navigation}}
    // `);

    this.render(hbs`{{nested-navigation}}`);
    expect(this.$()).to.have.length(1);
  });
});

import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | request form', function() {
  setupComponentTest('request-form', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#request-form}}
    //     template content
    //   {{/request-form}}
    // `);

    this.render(hbs`{{request-form}}`);
    expect(this.$()).to.have.length(1);
  });
});

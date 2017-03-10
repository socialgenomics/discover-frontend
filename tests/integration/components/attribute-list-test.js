import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | attributes list', function() {
  setupComponentTest('attribute-list', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#attribute-list}}
    //     template content
    //   {{/attribute-list}}
    // `);

    this.render(hbs`{{attribute-list}}`);
    expect(this.$()).to.have.length(1);
  });
});

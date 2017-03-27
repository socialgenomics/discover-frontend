import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | attribute list item', function() {
  setupComponentTest('attribute-list-item', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#attribute-list-item}}
    //     template content
    //   {{/attribute-list-item}}
    // `);

    this.render(hbs`{{attribute-list-item}}`);
    expect(this.$()).to.have.length(1);
  });
});
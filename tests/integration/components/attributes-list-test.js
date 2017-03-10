import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | attributes list', function() {
  setupComponentTest('attributes-list', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#attributes-list}}
    //     template content
    //   {{/attributes-list}}
    // `);

    this.render(hbs`{{attributes-list}}`);
    expect(this.$()).to.have.length(1);
  });
});

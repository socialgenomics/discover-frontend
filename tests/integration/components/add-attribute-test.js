import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | add attribute', function() {
  setupComponentTest('add-attribute', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#add-attribute}}
    //     template content
    //   {{/add-attribute}}
    // `);

    this.render(hbs`{{add-attribute}}`);
    expect(this.$()).to.have.length(1);
  });
});

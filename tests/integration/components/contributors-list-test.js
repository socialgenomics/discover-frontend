import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | contributors list', function() {
  setupComponentTest('contributors-list', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#contributors-list}}
    //     template content
    //   {{/contributors-list}}
    // `);

    this.render(hbs`{{contributors-list}}`);
    expect(this.$()).to.have.length(1);
  });
});

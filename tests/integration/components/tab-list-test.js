import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | tab list', function() {
  setupComponentTest('tab-list', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#tab-list}}
    //     template content
    //   {{/tab-list}}
    // `);

    this.render(hbs`{{tab-list}}`);
    expect(this.$()).to.have.length(1);
  });
});

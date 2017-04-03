import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | tab list action item', function() {
  setupComponentTest('tab-list-action-item', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#tab-list-action-item}}
    //     template content
    //   {{/tab-list-action-item}}
    // `);

    this.render(hbs`{{tab-list-action-item}}`);
    expect(this.$()).to.have.length(1);
  });
});

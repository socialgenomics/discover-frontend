import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | meta panel tabs', function() {
  setupComponentTest('meta-panel-tabs', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#meta-panel-tabs}}
    //     template content
    //   {{/meta-panel-tabs}}
    // `);

    this.render(hbs`{{meta-panel-tabs}}`);
    expect(this.$()).to.have.length(1);
  });
});

import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | unfollow form', function() {
  setupComponentTest('unfollow-form', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#unfollow-form}}
    //     template content
    //   {{/unfollow-form}}
    // `);

    this.render(hbs`{{unfollow-form}}`);
    expect(this.$()).to.have.length(1);
  });
});

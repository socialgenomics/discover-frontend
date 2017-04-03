import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | assay list', function() {
  setupComponentTest('assay-list', {
    integration: true
  });

  it('renders', function() {
    //TODO WILL ADD TOMORROW

    this.render(hbs`{{assay-list}}`);
    expect(this.$()).to.have.length(1);
  });
});

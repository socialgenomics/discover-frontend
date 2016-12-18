/* jshint expr:true */
import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration: PaginationBarComponent', function() {
  setupComponentTest('pagination-bar', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(hbs`{{pagination-bar}}`);
    expect(this.$()).to.have.length(1);
  });

  it('adds class disabled to previous button on first page', function() {
  });

  it('adds class disabled to next button when there are no pages left to load', function() {
  });
});

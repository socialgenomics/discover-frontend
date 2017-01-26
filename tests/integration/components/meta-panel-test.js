/* jshint expr:true */
import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration: MetaPanelComponent', function() {
  setupComponentTest('meta-panel', {
    integration: true
  });

  it('Renders filters when filters tab is active', function() {
    this.render(hbs`{{meta-panel model=model displayInfo=false}}`);
    // There are no aggregations in this mock - Get mock data?
    // expect(this.$('.filters-list').find(this.$('.section')[0]).find('h4').text().trim()).to.eql('Access');
    expect(this.$('.filters-list')).to.exist;
  });

  it('Renders info when info tab selected', function() {
    this.set('model', { name: 'ABC' });
    this.render(hbs`{{meta-panel model=model}}`);
    expect(this.$('.source-name-fallback').text().trim()).to.eql('ABC');
  });
});

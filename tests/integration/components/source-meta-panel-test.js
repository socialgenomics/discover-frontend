/* jshint expr:true */
import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration: SourceMetaPanelComponent', function() {
  setupComponentTest('source-meta-panel', {
    integration: true
  });

  it('Renders filters when filters tab is active', function() {
    this.render(hbs`{{source-meta-panel  model=model displayInfo=false}}`);
    expect(this.$('.filters-list').find('h4').text().trim()).to.eql('Filters');
  });
  it('Renders info when info tab selected', function() {
    this.set('model', { name: 'ABC' });
    this.render(hbs`{{source-meta-panel model=model}}`);
    expect(this.$('.source-name-fallback').text().trim()).to.eql('ABC');
  });
});

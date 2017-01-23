/* jshint expr:true */
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | filters list', function() {
  setupComponentTest('filters-list', {
    integration: true
  });

  // it('renders list of filters by category', function() {
  //   this.setProperties({
  //     filters: {
  //       displayName: 'Assay',
  //     },
  //     isEmptyFilters: false
  //   });
  //   this.render(hbs`{{filters-list filters=filters isEmptyFilters=false isLoading=isLoading}}`);
  //   expect(this.$('.section').find('h4').text().trim()).to.eql('Assay');
  // });

  // it('renders loading text when filters are loading', function() {
  //   this.setProperties({
  //     isEmptyFilters: false,
  //     isLoading: true
  //   });
  //   this.render(hbs`{{filters-list isEmptyFilters=isEmptyFilters isLoading=isLoading}}`);
  //   expect(this.$('.loading-text').text().trim()).to.eql('Loading new filters...');
  // });
});

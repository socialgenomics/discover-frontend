/* jshint expr:true */
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import wait from 'ember-test-helpers/wait';
import hbs from 'htmlbars-inline-precompile';

const searchServiceStub = Ember.Service.extend({
  isFilterActive: (filter) => false
});

describe('Integration | Component | filters list', function() {
  setupComponentTest('filters-list', {
    integration: true
  });

  beforeEach(function () {
    this.register('service:search', searchServiceStub);
    this.inject.service('search', { as: 'searchService' });
  });

  it('renders list of filters by category', function() {
    this.set('filter', { displayName: 'Assay' });
    this.render(hbs`{{filters-list filters=filters isLoading=isLoading}}`);
    expect(this.$('.section h4').text().trim()).to.eql('Assay');
  });

  it('renders loading text when filters are loading', function() {
    this.set('isLoading', true);
    this.render(hbs`{{filters-list filters=filters isLoading=isLoading}}`);
    expect(this.$('.loading-text').text().trim()).to.eql('Loading new filters...');
  });
});

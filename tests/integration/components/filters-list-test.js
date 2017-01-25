/* jshint expr:true */
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | filters list', function() {
  setupComponentTest('filters-list', {
    integration: true
  });

  it('renders list of filters by category', function() {
    this.setProperties({
      'activeFilters': [],
      'filters': [
        {
          buckets: [
            { colour: 'cyan', doc_count: 5, key: 'Open' }
          ],
          displayName: 'Access',
          name: 'access'
        }
      ]
    });
    this.render(hbs`{{filters-list filters=filters activeFilters=activeFilters}}`);
    expect(this.$('.section').find('h4').text().trim()).to.eql('Access');
  });

  it('renders loading text when filters are loading', function() {
    this.setProperties({
      'activeFilters': [],
      'filters': [
        {
          buckets: [
            { colour: 'cyan', doc_count: 5, key: 'Open' }
          ],
          displayName: 'Access',
          name: 'access'
        }
      ],
      'isLoading': true
    });
    this.render(hbs`{{filters-list filters=filters activeFilters=activeFilters isLoading=isLoading}}`);
    expect(this.$('.loading-text').text().trim()).to.eql('Loading new filters...');
  });
});

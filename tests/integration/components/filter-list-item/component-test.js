import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration: FilterListItemComponent', function() {
  setupComponentTest('filter-list-item', {
    integration: true
  });

  it('Renders the filter name and count.', function() {
    this.setProperties({
      bucket: {
        key: 'Abc',
        doc_count: 8
      },
      aggName: 'Datasource',
      activeFilters: ['access:Open']
    });
    this.render(hbs`{{filter-list-item bucket=bucket aggName=aggName activeFilters=activeFilters}}`);
    expect(this.$('span').text().trim()).to.eql('Abc (8)');
  });

  it('If filter is assay, render colour, filter name and count.', function() {
    this.setProperties({
      bucket: {
        key: 'Assay Abc',
        doc_count: 10
      },
      aggName: 'assay',
      activeFilters: ['access:Open']
    });
    this.render(hbs`{{filter-list-item bucket=bucket aggName=aggName activeFilters=activeFilters}}`);
    expect(this.$('span').text().trim()).to.eql('Assay Abc (10)');
  });
});

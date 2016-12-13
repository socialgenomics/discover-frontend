/* jshint expr:true */
import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

const searchServiceStub = Ember.Service.extend({
  isFilterActive: (filter) => false
});

describe('Integration: FilterListItemComponent', function() {
  setupComponentTest('filter-list-item', {
    integration: true
  });

  beforeEach(function () {
    this.register('service:search', searchServiceStub);
    this.inject.service('search', { as: 'searchService' });
  });

  it('Renders the filter name and count.', function() {
    this.setProperties({
      bucket: {
        key: 'Abc',
        doc_count: 8,
        colour: null
      },
      aggName: 'Datasource'
    });
    this.render(hbs`{{filter-list-item bucket=bucket aggName=aggName}}`);
    expect(this.$('span').text().trim()).to.eql('Abc (8)');
  });

  it('If filter is assay, render colour, filter name and count.', function() {
    this.setProperties({
      bucket: {
        key: 'Assay Abc',
        doc_count: 10,
        colour: 'indigo'
      },
      aggName: 'assay'
    });
    this.render(hbs`{{filter-list-item bucket=bucket aggName=aggName}}`);
    expect(this.$('span').text().trim()).to.eql('Assay Abc (10)');
    expect(this.$('div.label').hasClass('indigo')).to.be.true;
  });
});

/* jshint expr:true */
import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration: PaginationBarComponent', function() {
  setupComponentTest('pagination-bar', {
    integration: true
  });

  it('adds class disabled to previous button on first page', function() {
    this.set('currentPageNumber', 1);
    this.render(hbs`{{pagination-bar currentPageNumber=currentPageNumber}}`);
    expect(this.$('.btn').attr('disabled'), true);
  });

  it('adds class disabled to next button when there are no pages left to load', function() {
    this.setProperties({
      currentPageNumber: 5,
      totalPages: 5
    });
    this.render(hbs`{{pagination-bar currentPageNumber=currentPageNumber totalPages=totalPages}}`);
    expect(this.$('.btn').attr('disabled'), true);
  });

  it('displays correct page data', function() {
    this.setProperties({
      currentPageNumber: 4,
      totalPages: 7
    });
    this.render(hbs`{{pagination-bar currentPageNumber=currentPageNumber totalPages=totalPages}}`);
    expect(this.$().find(this.$('p')[0]).text().trim()).to.eql('Total pages: 7');
    expect(this.$().find(this.$('p')[1]).text().trim()).to.eql('Current page: 4');
  });

  it('displays correct page data', function() {
    this.setProperties({
      currentPageNumber: 4,
      totalPages: 7
    });
    this.render(hbs`{{pagination-bar currentPageNumber=currentPageNumber totalPages=totalPages}}`);
    expect(this.$().find(this.$('p')[0]).text().trim()).to.eql('Total pages: 7');
    expect(this.$().find(this.$('p')[1]).text().trim()).to.eql('Current page: 4');
  });
});

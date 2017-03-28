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
    expect(this.$('a').hasClass('u-hide-display')).to.be.true;
  });

  it('adds class disabled to next button when there are no pages left to load', function() {
    this.setProperties({
      currentPageNumber: 5,
      totalPages: 5
    });
    this.render(hbs`{{pagination-bar currentPageNumber=currentPageNumber totalPages=totalPages}}`);
    expect(this.$('a').hasClass('u-hide-display')).to.be.true;
  });

  it('displays correct page number', function() {
    this.set('currentPageNumber', 4);
    this.render(hbs`{{pagination-bar currentPageNumber=currentPageNumber}}`);
    expect(this.$('.u-inherit-disp').find(this.$('a')[3]).text().trim()).to.eql('4');
  });

  it('displays correct total page amount', function() {
    this.set('totalPages', 7);
    this.render(hbs`{{pagination-bar totalPages=totalPages}}`);
    expect(this.$('.u-flex').find(this.$('.u-tc-secondary.u-mr2')).text().trim()).to.eql('of 7');
  });
});

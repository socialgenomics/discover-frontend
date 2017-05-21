import { expect } from 'chai';
import { it, describe, beforeEach } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

describe('Integration: RUI r-pagination', function() {
  setupComponentTest('rui/r-pagination', {
    integration: true
  });

  beforeEach(function () {
    this.setProperties({
      previousPage: sinon.spy(),
      goToPage: sinon.spy(),
      nextPage: sinon.spy()
    })
  });

  it('adds class disabled to previous button on first page', function() {
    this.set('currentPageNumber', 1);
    this.render(hbs`{{rui/r-pagination currentPageNumber=currentPageNumber previousPage=previousPage goToPage=goToPage nextPage=nextPage}}`);
    expect(this.$('a').hasClass('u-hide-display')).to.be.true;
  });

  it('adds class disabled to next button when there are no pages left to load', function() {
    this.setProperties({
      currentPageNumber: 5,
      totalPages: 5
    });
    this.render(hbs`{{rui/r-pagination currentPageNumber=currentPageNumber totalPages=totalPages previousPage=previousPage goToPage=goToPage nextPage=nextPage}}`);
    expect(this.$('a').hasClass('u-hide-display')).to.be.true;
  });

  it('displays correct page number', function() {
    this.set('currentPageNumber', 4);
    this.render(hbs`{{rui/r-pagination currentPageNumber=currentPageNumber previousPage=previousPage goToPage=goToPage nextPage=nextPage}}`);
    expect(this.$('.u-inherit-disp').find(this.$('a')[3]).text().trim()).to.eql('4');
  });

  it('displays correct total page amount', function() {
    this.setProperties({
      currentPageNumber: 4,
      totalPages: 7
    });
    this.render(hbs`{{rui/r-pagination currentPageNumber=currentPageNumber totalPages=totalPages previousPage=previousPage goToPage=goToPage nextPage=nextPage}}`);
    expect(this.$('.u-flex').find(this.$('.u-tc-secondary.u-mb0')).text().trim()).to.eql('Page 4 of 7');
  });
});

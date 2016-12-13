/* jshint expr:true */
import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration: SearchResultsListComponent', function() {
  setupComponentTest('search-results-list', {
    integration: true
  });

  it('Displays message when there are no results.', function() {
    const message = `Sorry, there are no matching datasets. You can make request to ask our community for help.`;
    this.set('totalResults', 0);
    this.render(hbs`{{search-results-list totalResults=totalResults}}`);
    expect(this.$('h3').text().trim()).to.eql(message);
  });
});

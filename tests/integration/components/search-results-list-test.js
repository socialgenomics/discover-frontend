/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'search-results-list',
  'Integration: SearchResultsListComponent',
  {
    integration: true
  },
  function() {
    it('Displays message when there are no results.', function() {
      const message = `Sorry, there are no matching datasets. You can make request to ask our community for help.`;
      this.set('totalResults', 0);
      this.render(hbs`{{search-results-list totalResults=totalResults}}`);
      expect(this.$('h3').text().trim()).to.eql(message);
    });
  }
);

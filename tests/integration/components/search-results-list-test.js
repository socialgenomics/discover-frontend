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
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#search-results-list}}
      //     template content
      //   {{/search-results-list}}
      // `);

      this.render(hbs`{{search-results-list}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

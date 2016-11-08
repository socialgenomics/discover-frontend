/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'collection-summary-fallback',
  'Integration: CollectionSummaryFallbackComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#collection-summary-fallback}}
      //     template content
      //   {{/collection-summary-fallback}}
      // `);

      this.render(hbs`{{collection-summary-fallback}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

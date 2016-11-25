/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'collection-feed-item',
  'Integration: CollectionFeedItemComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#collections-card}}
      //     template content
      //   {{/collections-card}}
      // `);
      //
      // this.render(hbs`{{collection-feed-item}}`);
      // expect(this.$()).to.have.length(1);
    });
  }
);

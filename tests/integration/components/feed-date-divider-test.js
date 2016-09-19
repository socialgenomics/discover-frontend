/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'feed-date-divider',
  'Integration: FeedDateDividerComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#feed-date-divider}}
      //     template content
      //   {{/feed-date-divider}}
      // `);

      this.render(hbs`{{feed-date-divider}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

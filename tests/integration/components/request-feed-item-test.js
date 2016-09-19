/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'request-feed-item',
  'Integration: RequestFeedItemComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#requests-card}}
      //     template content
      //   {{/requests-card}}
      // `);

      this.render(hbs`{{request-feed-item}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

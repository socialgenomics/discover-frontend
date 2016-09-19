/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'source-feed-item',
  'Integration: SourceFeedItemComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#sources-card}}
      //     template content
      //   {{/sources-card}}
      // `);

      this.render(hbs`{{source-feed-item}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
describeComponent(
  'tag-item',
  'Integration: TagItemComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#tag-item}}
      //     template content
      //   {{/tag-item}}
      // `);

      this.render(hbs`{{tag-item}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

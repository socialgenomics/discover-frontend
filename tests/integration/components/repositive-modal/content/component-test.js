/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'repositive-modal/content',
  'Integration: RepositiveModalContentComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#repositive-modal/content}}
      //     template content
      //   {{/repositive-modal/content}}
      // `);

      this.render(hbs`{{repositive-modal/content}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

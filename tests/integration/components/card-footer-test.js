/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'card-footer',
  'Integration: CardFooterComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#card-footer}}
      //     template content
      //   {{/card-footer}}
      // `);

      this.render(hbs`{{card-footer}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

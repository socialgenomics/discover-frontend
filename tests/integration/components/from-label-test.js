/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'from-label',
  'Integration: FromLabelComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#from-label}}
      //     template content
      //   {{/from-label}}
      // `);

      this.render(hbs`{{from-label}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

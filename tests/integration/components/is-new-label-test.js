/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'is-new-label',
  'Integration: IsNewLabelComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#is-new-label}}
      //     template content
      //   {{/is-new-label}}
      // `);

      this.render(hbs`{{is-new-label}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

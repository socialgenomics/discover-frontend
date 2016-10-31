/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'assay-type',
  'Integration: AssayTypeComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#assay-type}}
      //     template content
      //   {{/assay-type}}
      // `);

      this.render(hbs`{{assay-type}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

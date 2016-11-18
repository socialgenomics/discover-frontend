/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'repositive-modal/wrapper',
  'Integration: RepositiveModalWrapperComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#repositive-modal/wrapper}}
      //     template content
      //   {{/repositive-modal/wrapper}}
      // `);

      this.render(hbs`{{repositive-modal/wrapper}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

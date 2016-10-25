/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'name-fallback',
  'Integration: NameFallbackComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#name-fallback}}
      //     template content
      //   {{/name-fallback}}
      // `);

      this.render(hbs`{{name-fallback}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

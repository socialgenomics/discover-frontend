/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'stats-number-ring',
  'Integration: StatsNumberRingComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#stats-number-ring}}
      //     template content
      //   {{/stats-number-ring}}
      // `);

      this.render(hbs`{{stats-number-ring}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

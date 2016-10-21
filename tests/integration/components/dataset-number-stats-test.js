/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'dataset-number-stats',
  'Integration: DatasetNumberStatsComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#dataset-number-stats}}
      //     template content
      //   {{/dataset-number-stats}}
      // `);

      this.render(hbs`{{dataset-number-stats}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

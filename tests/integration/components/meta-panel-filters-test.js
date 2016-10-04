/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'meta-panel-filters',
  'Integration: MetaPanelFiltersComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#meta-panel-filters}}
      //     template content
      //   {{/meta-panel-filters}}
      // `);

      this.render(hbs`{{meta-panel-filters}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

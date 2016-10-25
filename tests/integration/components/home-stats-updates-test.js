/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'home-stats-updates',
  'Integration: HomeStatsUpdatesComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#home-stats-updates}}
      //     template content
      //   {{/home-stats-updates}}
      // `);

      this.render(hbs`{{home-stats-updates}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

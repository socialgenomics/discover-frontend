/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'panel-back-button',
  'Integration: PanelBackButtonComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#panel-back-button}}
      //     template content
      //   {{/panel-back-button}}
      // `);

      this.render(hbs`{{panel-back-button}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

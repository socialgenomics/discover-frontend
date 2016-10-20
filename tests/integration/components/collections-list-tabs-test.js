/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'collections-list-tabs',
  'Integration: CollectionsListTabsComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#collections-list-tabs}}
      //     template content
      //   {{/collections-list-tabs}}
      // `);

      this.render(hbs`{{collections-list-tabs}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

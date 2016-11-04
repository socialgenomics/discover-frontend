/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'collection-created-by',
  'Integration: CollectionCreatedByComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#collection-created-by}}
      //     template content
      //   {{/collection-created-by}}
      // `);

      this.render(hbs`{{collection-created-by}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

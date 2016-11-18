/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'create-account-modal-content',
  'Integration: CreateAccountModalContentComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#create-account-modal-content}}
      //     template content
      //   {{/create-account-modal-content}}
      // `);

      this.render(hbs`{{create-account-modal-content}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

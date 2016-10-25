/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'datasource-name',
  'Integration: DatasourceNameComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#datasource-name}}
      //     template content
      //   {{/datasource-name}}
      // `);

      this.render(hbs`{{datasource-name}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

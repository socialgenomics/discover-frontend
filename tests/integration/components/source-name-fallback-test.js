/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'source-name-fallback',
  'Integration: NameFallbackComponent',
  {
    integration: true
  },
  function() {
    it('prints the name when present', function() {
      const model = {
        name: 'primary-name',
        properties: {
          short_name: 'secondary-name'
        }
      };
      this.set('model', model);
      this.render(hbs`{{source-name-fallback model=model}}`);
      expect(this.$().text().trim()).to.eql('primary-name');
    });

    it('falls back to the secondary name when no name is present', function() {
      const model = {
        name: null,
        properties: {
          short_name: 'secondary-name'
        }
      };
      this.set('model', model);
      this.render(hbs`{{source-name-fallback model=model}}`);
      expect(this.$().text().trim()).to.eql('secondary-name');
    });
  }
);

/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'metadata-panel',
  'Integration: MetadataPanelComponent',
  {
    integration: true
  },
  function() {
    it('shows the displayName of the collection owner when present', function() {
      const model = {
        userId: {
          id: 1,
          displayName: 'Nikola Tesla'
        }
      };
      this.set('model', model);
      this.render(hbs`{{collection-meta-panel model=model}}`);
      expect(this.$('.collection-owner').text().trim()).to.eql(model.userId.displayName);
    });

    it('shows the creator as repositive when it has type repositive_collection', function() {
      const model = { type: 'repositive_collection' };
      this.set('model', model);
      this.render(hbs`{{collection-meta-panel model=model}}`);
      expect(this.$('.collection-owner').text().trim()).to.eql('Repositive');
    });
  }
);

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
    it('renders repositive for repositive owned collections', function() {
      const type = 'repositive_collection';
      this.set('type', type);
      this.render(hbs`{{collection-created-by type=type}}`);
      expect(this.$('.collection-owner').text().trim()).to.eql('Repositive');
    });
    it('renders the displayName of the owner if the type is personal_repository', function() {
      const user = {
        id: 1,
        displayName: 'Nikola Tesla'
      };
      const type = 'personal_repository';
      this.setProperties({ type: type, user: user });
      this.render(hbs`{{collection-created-by user=user type=type}}`);
      expect(this.$('.collection-owner').text().trim()).to.eql('Nikola Tesla');
    });
  }
);

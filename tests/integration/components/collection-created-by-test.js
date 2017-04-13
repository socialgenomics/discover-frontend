import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration: CollectionCreatedByComponent', function() {
  setupComponentTest('collection-created-by', {
    integration: true
  });

  it('renders repositive for repositive owned collections', function() {
    this.set('type', 'repositive_collection');
    this.render(hbs`{{collection-created-by type=type}}`);
    expect(this.$('.u-tc-primary').text().trim()).to.eql('Repositive');
  });
  it('renders the displayName of the owner if the type is personal_repository', function() {
    const user = {
      id: 1,
      displayName: 'Nikola Tesla'
    };
    const type = 'personal_repository';
    this.setProperties({ type, user });
    this.render(hbs`{{collection-created-by user=user type=type}}`);
    expect(this.$('.u-tc-primary').text().trim()).to.eql('Nikola Tesla');
  });
});

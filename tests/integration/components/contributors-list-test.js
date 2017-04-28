import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

const getContributors = () => {
  return {
    id: '1',
    displayName: 'Liz',
    userProfile: {
      workOrganisation: 'Developer'
    }
  };
};

describe('Integration | Component | contributors list', function() {
  setupComponentTest('contributors-list', {
    integration: true
  });

  it('renders a list of contributors as user-preview components', function() {
    this.setProperties({
      'contributors': [getContributors()],
      'modelName': 'dataset'
    });
    this.render(hbs`{{contributors-list contributors=contributors modelName=modelName}}`);
    expect(this.$('h4.fc-primary').text().trim()).to.eql('Liz');
    expect(this.$('p.fs1').text().trim()).to.eql('Developer');
  });

  it('renders an empty list when there are no contributors', function() {
    this.setProperties({
      'contributors': [],
      'modelName': 'dataset'
    });
    this.render(hbs`{{contributors-list contributors=contributors modelName=modelName}}`);
    expect(this.$('p').text().trim()).to.eql('No one has contributed to this dataset yet. Be the first.');
  });
});

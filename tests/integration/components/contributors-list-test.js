import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

const getContributors = () => {
  return {
    id: '1',
    displayName: 'Liz',
    profile: {
      work_organisation: 'Repositive'
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
    expect(this.$('h4.u-tc-primary').text().trim()).to.eql('Liz');
    expect(this.$('p.u-fs1').text().trim()).to.eql('Repositive');
  });

  it('renders an empty list when there are no contributors', function() {
    this.setProperties({
      'contributors': [],
      'modelName': 'dataset'
    });
    this.render(hbs`{{contributors-list contributors=contributors modelName=modelName}}`);
    expect(this.$('p').text().trim()).to.eql('Please login or create an account to contribute to this dataset.');
  });
});

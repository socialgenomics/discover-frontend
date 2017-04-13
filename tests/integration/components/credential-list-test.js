import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | credential list', function() {
  setupComponentTest('credential-list', {
    integration: true
  });

  it('renders a primary email when it is present', function() {
    this.setProperties({
      'credential': {
        main_credential: {
          email: 'liz@repositive.io',
        }
      }
    });
    this.render(hbs`{{credential-list credential=credential}}`);
    expect(this.$('p.u-mb0.u-mr1').text().trim()).to.eql('liz@repositive.io');
  });

  it('renders the secondary emails list when they are present', function() {
    this.setProperties({
      'credential': {
        secondary_credentials: {
          email: 'liz@repositive.io',
        }
      }
    });
    this.render(hbs`{{credential-list credential=credential}}`);
    expect(this.$().find(this.$('.u-py2 p.u-mb0')[0]).text().trim()).to.eql('Secondary Emails');
  });
});

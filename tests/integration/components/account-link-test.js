import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | account link', function() {
  setupComponentTest('account-link', {
    integration: true
  });

  it('renders correct data and icon for account link', function() {
    this.setProperties({
      account: 'https://google.com/repositive',
      accountName: 'Google'
    });
    this.render(hbs`{{account-link account=account accountName=accountName}}`);
    expect(this.$('a.u-flex p.u-tc-secondary').text().trim()).to.eql('Google');
    expect(this.$('a.u-flex svg')).to.have.length(1);
  });

  it('renders correct account link for twitter', function() {
    this.setProperties({
      account: '@repositiveio',
      accountName: 'Twitter'
    });
    this.render(hbs`{{account-link account=account accountName=accountName}}`);
    const $accountLink = this.$('a.u-flex');
    expect($accountLink.attr('href')).to.eql('https://twitter.com/@repositiveio');
  });
});

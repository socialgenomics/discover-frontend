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
      'credentials': {
        main_credential: {
          email: 'liz@repositive.io'
        }
      }
    });
    this.render(hbs`{{credential-list credentials=credentials}}`);
    expect(this.$().find(this.$('p.mb0.fs2')[0]).text().trim()).to.eql('liz@repositive.io');
  });
});

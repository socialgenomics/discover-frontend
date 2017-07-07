import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | vertical-menu link-item', function() {
  setupComponentTest('vertical-menu/link-item', {
    integration: true
  });

  it('renders the correct help link text', function() {
    this.setProperties({
      'text': 'How do I search on Repositive?'
    });
    this.render(hbs`{{vertical-menu/link-item text=text}}`);
    expect(this.$().find(this.$('a')).text().trim()).to.eql('How do I search on Repositive?');
  });
});

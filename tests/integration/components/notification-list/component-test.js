import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | notification list', function() {
  setupComponentTest('notification-list', {
    integration: true
  });

  it('if there are no notifcations a message is displayed', function() {
    this.render(hbs`{{notification-list}}`);
    expect(this.$().text().trim()).to.eql(`You\'re up to date.`);
  });
});

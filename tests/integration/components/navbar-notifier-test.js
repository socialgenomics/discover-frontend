import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

function getNotificationObj() {
  return { status: 'unseen' };
}

describe('Integration | Component | navbar notifier', function() {
  setupComponentTest('navbar-notifier', {
    integration: true
  });

  it('bell is red when there are unseen notifications', function() {
    this.set('notifications', [getNotificationObj()]);
    this.render(hbs`{{navbar-notifier notifications=notifications}}`);
    expect(this.$('div').hasClass('fc-red')).to.be.true;
  });

  it('bell is grey when there are no unseen notifications', function() {
    this.set('notifications', [getNotificationObj()]);
    this.set('notifications.firstObject.status', 'seen');
    this.render(hbs`{{navbar-notifier notifications=notifications}}`);
    expect(this.$('div').hasClass('fc-secondary')).to.be.true;
  });

  it('bell is grey when there are no notifications', function() {
    this.set('notifications', []);
    this.render(hbs`{{navbar-notifier notifications=notifications}}`);
    expect(this.$('div').hasClass('fc-secondary')).to.be.true;
  });
});

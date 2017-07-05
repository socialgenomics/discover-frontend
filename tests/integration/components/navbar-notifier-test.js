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

  it('should show red dot when there are unseen notifications', function() {
    this.set('notifications', [getNotificationObj()]);
    this.render(hbs`{{navbar-notifier notifications=notifications}}`);
    expect(this.$('.c-notification-unread-marker-marker__bell').length).to.be.equal(1);
  });

  it('should not show red dot when there are no unseen notifications', function() {
    this.set('notifications', [getNotificationObj()]);
    this.set('notifications.firstObject.status', 'seen');
    this.render(hbs`{{navbar-notifier notifications=notifications}}`);
    expect(this.$('.c-notification-unread-marker-marker__bell').length).to.be.equal(0);
  });

  it('should not show red dot when there are no notifications', function() {
    this.set('notifications', []);
    this.render(hbs`{{navbar-notifier notifications=notifications}}`);
    expect(this.$('.c-notification-unread-marker-marker__bell').length).to.be.equal(0);
  });
});

import Ember from 'ember';

const { Component, computed, get, set } = Ember;

export default Component.extend({
  tagName: 'li',
  classNames: ['u-p2', 'u-pr3', 'u-flex', 'u-items-center', 'u-border-bottom', 'u-hv-bc-white', 'u-cursor-pointer'],
  isAction: computed('notification', function() {
    return get(this, 'notification.properties.type') === 'action' ? true : false;
  }),
  click() { this.touchEnd(); },
  touchEnd() {
    const notification = get(this, 'notification');
    const subscribableModel = get(notification, 'subscriptionId.subscribableModel');
    const subscribableId = get(notification, 'subscriptionId.subscribableId.id');
    get(this, 'transitionToSubscribable')(subscribableModel, subscribableId);
    set(notification, 'status', 'seen');
    get(this, 'close')(get(this, 'dropdown'));
    notification.save().then(() => {
      get(this, 'reloadNotifications')();
    });
  }
});
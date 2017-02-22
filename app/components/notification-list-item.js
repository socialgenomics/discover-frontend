import Ember from 'ember';

const { Component, get, set } = Ember;

export default Component.extend({
  tagName: 'li',
  classNames: ['u-p2', 'u-border-bottom', 'u-hv-bc-white', 'u-cursor-pointer'],

  click() { this.touchEnd(); },
  touchEnd() {
    const notification = get(this, 'notification');
    const subscribableModel = get(notification, 'subscriptionId.subscribableModel');
    const subscribableId = get(notification, 'subscriptionId.subscribableId.id');
    get(this, 'transitionToSubscribable')(subscribableModel, subscribableId);
    set(notification, 'status', 'seen');
    notification.save();
  }

});

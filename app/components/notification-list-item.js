import Ember from 'ember';

const { Component, computed, get, set } = Ember;

export default Component.extend({
  tagName: 'li',
  classNames: ['p3', 'pr4', 'u-flex', 'u-items-center', 'border-bottom', 'u-hv-bc-white', 'u-cursor-pointer', 'relative'],

  isAction: computed.equal('notification.properties.type', 'action'),

  click() { this.touchEnd(); },
  touchEnd() {
    const notification = get(this, 'notification');
    const subscribableModel = get(notification, 'subscriptionId.subscribableModel');
    const subscribableId = get(notification, 'subscriptionId.subscribableId.id');
    get(this, 'transitionToSubscribable')(subscribableModel, subscribableId);
    set(notification, 'status', 'read');
    get(this, 'close')(get(this, 'dropdown'));
    notification.save().then(() => { get(this, 'reloadNotifications')(); });
  }
});

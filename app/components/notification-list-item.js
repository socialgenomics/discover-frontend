import Ember from 'ember';

const { Component, computed, get, set } = Ember;

export default Component.extend({
  tagName: 'li',
  classNames: ['p3', 'pr4', 'flex', 'items-center', 'border-bottom', 'u-hv-bc-white', 'cursor-pointer', 'relative'],

  isAction: computed.equal('notification.properties.type', 'action'),
  model: computed('notification.subscriptionId.{datasetId,requestId}', function() {
    const datasetId = get(this, 'notification.subscriptionId.datasetId');
    const requestId = get(this, 'notification.subscriptionId.requestId');
    if (datasetId.content) { return datasetId; }
    if (requestId.content) { return requestId; }
    return false;
  }),

  click() { this.touchEnd(); },

  touchEnd() {
    const notification = get(this, 'notification');
    const subscribableModel = get(notification, 'subscriptionId.subscribableModel');

    get(this, 'transitionToSubscribable')(subscribableModel, get(this, 'model.id'));
    set(notification, 'status', 'read');
    get(this, 'close')(get(this, 'dropdown'));
    notification
      .save()
      .then(() => { get(this, 'reloadNotifications')(); });
  }
});

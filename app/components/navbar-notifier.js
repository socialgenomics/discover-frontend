import Ember from 'ember';

const { Component, computed, inject: { service }, get } = Ember;

export default Component.extend({
  notifications: service(),

  classNames: ['u-flex', 'u-self-stretch', 'u-shrink-none', 'u-items-center', 'u-justify-center', 'u-hv-bc-off-white'],
  classNameBindings: ['hasNotifications:u-tc-red:u-tc-secondary'],
  hasNotifications: computed.notEmpty('notifications'),
  init() {
    this._super(...arguments);
    get(this, 'notifications').getNotifications();
  },
  actions: {
    close(dropdown) {
      dropdown.actions.close();
    }
  }
});

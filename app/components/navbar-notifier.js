import Ember from 'ember';

const { Component, computed, inject: { service }, get } = Ember;

export default Component.extend({
  notificationsService: service('notifications'),
  session: service(),

  classNames: ['u-flex', 'u-self-stretch', 'u-shrink-none', 'u-items-center', 'u-justify-center', 'u-hv-bc-off-white'],
  classNameBindings: ['hasNotifications:u-tc-red:u-tc-secondary'],
  hasNotifications: computed.notEmpty('notifications'),

  notifications: computed('notificationsService', 'session', function() {
    if (get(this, 'session.isAuthenticated')) {
      return get(this, 'notificationsService.getNotifications')(get(this, 'session.authenticatedUser.id'));
    }
  }),

  actions: {
    close(dropdown) {
      dropdown.actions.close();
    }
  }
});

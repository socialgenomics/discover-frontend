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
      const notificationsService = get(this, 'notificationsService');
      notificationsService.getNotifications(get(this, 'session.session.authenticated.user.id'));
    }
  }),

  actions: {
    close(dropdown) {
      dropdown.actions.close();
    }
  }
});

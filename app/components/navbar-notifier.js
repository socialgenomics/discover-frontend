import Ember from 'ember';

const { Component, computed, inject: { service }, get, Logger, set, setProperties, RSVP } = Ember;

export default Component.extend({
  // notificationsService: service('notifications'),
  session: service(),
  store: service(),

  classNames: ['u-flex', 'u-self-stretch', 'u-shrink-none', 'u-items-center', 'u-justify-center', 'u-hv-bc-off-white'],
  classNameBindings: ['hasNotifications:u-tc-red:u-tc-secondary'],
  hasNotifications: computed.notEmpty('notifications'),

  didReceiveAttrs() {
    this._super(...arguments);
    if (get(this, 'session.isAuthenticated')) {
      this._getNotifications(get(this, 'session.session.authenticated.user.id'));
    }
  },

  _getNotifications(userId) {
    const store = get(this, 'store');
    return store.query('notification', {
      'where.user_id': userId,
      'order[0][0]': 'created_at',
      'order[0][1]': 'DESC'
    })
      .then(notifications => {
        // const action = store.peekRecord('action', '27a21a60-0058-41c7-9f5f-f607729241d1');
        const notificationsArray = notifications.map(notification => {
          // setProperties(notification, {
          //   'properties.action': action,
          //   'properties.type': 'action'
          // });
          this._getRelatedData(notification);
          return notification;
        });

        set(this, 'notifications', notificationsArray);
        return notificationsArray;

      }).catch(Logger.error);
  },

  _getRelatedData(notification) {
    const store = get(this, 'store');
    return RSVP.hash({
      subscription: store.findRecord('subscription', get(notification, 'subscriptionId.id')),
      action: store.findRecord('action', get(notification, 'properties.action_id'))
    })
      .then(data => {
        set(notification, 'properties.action', get(data, 'action'));
        return RSVP.hash({
          datasetOrRequest: store.findRecord(get(data, 'subscription.subscribableModel'), get(data, 'subscription.subscribableId.id')),
          user: store.findRecord('user', get(notification, 'properties.action.userId.id'))
        });
      })
      .then(data => {
        const modelKey = `subscriptionId.subscribableId.${get(notification, 'subscriptionId.subscribableModel')}`;
        set(notification, modelKey, get(data, 'datasetOrRequest'));
        return data;
      }).catch(Logger.error);
  },

  actions: {
    close(dropdown) { dropdown.actions.close(); }
  }
});

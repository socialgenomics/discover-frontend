import Ember from 'ember';

const { Component, computed, inject: { service }, get, getWithDefault, Logger, set, setProperties, RSVP, isEmpty } = Ember;

export default Component.extend({
  session: service(),
  store: service(),

  classNames: ['u-flex', 'u-self-stretch', 'u-shrink-none', 'u-items-center', 'u-justify-center', 'u-hv-bc-off-white'],
  classNameBindings: ['hasUnseenNotifications:u-tc-red:u-tc-secondary'],
  hasUnseenNotifications: computed('notifications.@each.status', function() {
    const unseenNotifications = getWithDefault(this, 'notifications', []).filterBy('status', 'unseen');
    return !isEmpty(unseenNotifications);
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    if (get(this, 'session.isAuthenticated')) {
      this._getNotifications(get(this, 'session.session.authenticated.user.id'));
    }
  },

  _getNotifications(userId) {
    const store = get(this, 'store');
    set(this, 'isLoading', true);
    return store.query('notification', {
      'where.user_id': userId,
      'where.properties.target.app': true,
      'include[0].model': 'subscription',
      'include[1].model': 'action',
      'order[0][0]': 'created_at',
      'order[0][1]': 'DESC'
    })
      .then(notifications => {
        return RSVP.all(notifications.map(notification => {
          return this._getRelatedData(notification);
        }))
          .then(notifications => {
            setProperties(this, {
              'notifications': notifications,
              'isLoading': false
            });
            return notifications;
          });
      })
      .catch(error => {
        set(this, 'isLoading', false);
        Logger.error(error);
      });
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
          return notification;
        })
        .catch(Logger.error);
  },

  _peekAndSetAction(notification) {
    const store = get(this, 'store');
    const action = store.peekRecord('action', get(notification, 'properties.action_id'));
    set(notification, 'properties.action', action);
    return notification;
  },

  _setNotificationsToSeen() {
    return get(this, 'notifications')
      .filterBy('status', 'unseen')
      .map(notification => {
        set(notification, 'status', 'seen');
        return notification;
      });
  },

  actions: {
    close(dropdown) {
      dropdown.actions.close();
    },

    handleTriggerEvent() {
      if (get(this, 'hasUnseenNotifications')) {
        set(this, 'isLoading', true);
        return RSVP.all(this._setNotificationsToSeen().map(notification => {
          return notification.save()
            .then(notification => this._peekAndSetAction(notification));
        }))
          .catch(Logger.error)
          .finally(() => { set(this, 'isLoading', false); });
      }
    },

    reloadNotifications() {
      this._getNotifications(get(this, 'session.session.authenticated.user.id'));
    }
  }
});

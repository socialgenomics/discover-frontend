import Ember from 'ember';

const { Component, computed, inject: { service }, get, getWithDefault, Logger, set, setProperties, RSVP, isEmpty } = Ember;

export default Component.extend({
  session: service(),
  store: service(),

  classNames: ['flex', 'self-stretch', 'flex-shrink-none', 'items-center', 'justify-center', 'u-hv-bc-very-light-grey'],
  classNameBindings: ['hasUnseenNotifications:fc-red:fc-secondary'],

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

  actions: {
    close(dropdown) { dropdown.actions.close(); },

    handleTriggerEvent() {
      if (get(this, 'hasUnseenNotifications')) {
        set(this, 'isLoading', true);
        return RSVP.all(
          this._setNotificationsToSeen(get(this, 'notifications'))
            .map(notification => {
              return notification.save().then(notification => this._peekAndSetAction(notification));
            })
        )
        .catch(Logger.error)
        .finally(() => { set(this, 'isLoading', false); });
      }
    },

    reloadNotifications() {
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
      'order[0][0]': 'created_at',
      'order[0][1]': 'DESC'
    })
      .then(notifications => {
        return RSVP.all(notifications.map(notification => {
          const subscription = get(notification, 'subscription');
          store.push(store.normalize('subscription', subscription));
          if (get(notification, 'properties.type') === 'action') {
            return this._getRelatedData(notification, subscription);
          } else {
            return notification;
          }
        }))
          .then(notifications => {
            setProperties(this, {
              'notifications': notifications.reject(notification => notification ? false : true),
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

  _getRelatedData(notification, subscription) {
    const store = get(this, 'store');
    return this._getActionAndDataset(notification, subscription, store)
      .then(data => {
        set(notification, 'properties.action', get(data, 'action'));
        return RSVP.hash({
          datasetOrRequest: data.datasetOrRequest,
          user: store.findRecord('user', get(notification, 'properties.action.userId.id'))
        });
      })
        .then(data => this._setModelOnNotification(notification, get(data, 'datasetOrRequest')))
        .catch(Logger.error);
  },

  _getActionAndDataset(notification, subscription, store) {
    return RSVP.hash({
      action: store.findRecord('action', get(notification, 'properties.action_id')),
      datasetOrRequest: store.findRecord(get(subscription, 'subscribable_model'), get(subscription, 'subscribable_id'))
    });
  },

  _peekAndSetAction(notification) {
    const store = get(this, 'store');
    const action = store.peekRecord('action', get(notification, 'properties.action_id'));
    set(notification, 'properties.action', action);
    return notification;
  },

  _setNotificationsToSeen(notifications) {
    return notifications
      .filterBy('status', 'unseen')
      .map(notification => {
        set(notification, 'status', 'seen');
        return notification;
      });
  },

  _setModelOnNotification(notification, model) {
    const modelKey = `subscriptionId.subscribableId.${get(notification, 'subscriptionId.subscribableModel')}`;
    set(notification, modelKey, model);
    return notification;
  }
});

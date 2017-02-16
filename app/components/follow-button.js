import Ember from 'ember';

const { Component, computed, get, inject: { service }, Logger, set, setProperties } = Ember;

export default Component.extend({
  tagName: 'button',
  classNameBindings: ['isFollowing:c-follow-btn-active:c-follow-btn'],

  session: service(),
  store: service(),

  isFollowing: computed('subscription.active', function() {
    return get(this, 'subscription') ? get(this, 'subscription.active') : false;
  }),

  subscription: computed('subscribable', 'session', {
    get() {
      const subscriptions = get(this, 'subscribable.subscriptions') || false;
      if (subscriptions) {
        return subscriptions.find(subscription => {
          if (get(subscription, 'userId.id') === get(this, 'session.authenticatedUser.id')) {
            return true;
          }
        });
      } else {
        return null;
      }
    },
    set(key, value) {
      return value;
    }
  }),

  click() {
    set(this, 'loading', true);
    const subscription = get(this, 'subscription');
    if (subscription) {
      subscription.toggleProperty('active');
      subscription.save()
        .then((savedSubscription) => {
          setProperties(this, {
            'subscription': savedSubscription,
            'loading': false
          });
        })
        .catch(err => {
          set(this, 'loading', false);
          Logger.error(err);
        });
    } else {
      this._createSubscription()
        .then((savedSubscription) => {
          setProperties(this, {
            'subscription': savedSubscription,
            'loading': false
          });
        }).catch(err => {
          set(this, 'loading', false);
          Logger.error(err);
        });
    }
  },

  _createSubscription() {
    const currentModel = get(this, 'model'); //can be request or dataset
    return get(this, 'store').createRecord('subscription', {
      active: true,
      subscribableId: get(this, 'subscribable'),
      subscribableModel: currentModel.constructor.modelName,
      userId: get(this, 'session.authenticatedUser')
    }).save();
  }

});

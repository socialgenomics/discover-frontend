import Ember from 'ember';

const { Component, computed, get, inject: { service }, Logger, set, setProperties } = Ember;

export default Component.extend({
  tagName: 'button',
  classNames: ['c-follow-btn'],
  classNameBindings: ['isFollowing:c-follow-btn-following:c-follow-btn-default', 'isUnfollow:c-follow-btn-unfollow'],

  session: service(),
  store: service(),

  isFollowing: computed('subscription.active', function() {
    return get(this, 'subscription') ? get(this, 'subscription.active') : false;
  }),

  isUnfollow: computed.and('isFollowing', 'isHovering'),

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

  mouseEnter() { set(this, 'isHovering', true); },
  mouseLeave() { set(this, 'isHovering', false);  },

  click() {
    if (!get(this, 'isLoading')) {
      set(this, 'isLoading', true);
      const subscription = get(this, 'subscription');
      if (subscription) {
        subscription.toggleProperty('active');
        subscription.save()
          .then((savedSubscription) => {
            setProperties(this, {
              'subscription': savedSubscription,
              'isLoading': false
            });
          })
          .catch(err => {
            set(this, 'isLoading', false);
            Logger.error(err);
          });
      } else {
        this._createSubscription()
          .then((savedSubscription) => {
            setProperties(this, {
              'subscription': savedSubscription,
              'isLoading': false
            });
          }).catch(err => {
            set(this, 'isLoading', false);
            Logger.error(err);
          });
      }
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

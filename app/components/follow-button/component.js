import Ember from 'ember';

const { Component, computed, get, inject: { service }, Logger, set, setProperties } = Ember;

export default Component.extend({
  session: service(),
  store: service(),

  tagName: 'button',
  classNames: ['c-follow-btn'],
  classNameBindings: ['isFollowing:c-follow-btn-following:c-follow-btn-default', 'isUnfollow:c-follow-btn-unfollow'],
  showCreateAccountModal: false,

  isUnfollow: computed.and('isFollowing', 'isHovering'),

  isFollowing: computed('subscription.active', function() {
    return get(this, 'subscription') ? get(this, 'subscription.active') : false;
  }),

  subscription: computed('subscribable.subscriptions', 'session', {
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

  actions: {
    toggleCreateAccountModal() {
      this.toggleProperty('showCreateAccountModal');
    }
  },

  mouseEnter() { set(this, 'isHovering', true); },
  mouseLeave() { set(this, 'isHovering', false);  },

  click() {
    if (!get(this, 'session.isAuthenticated')) {
      return this.send('toggleCreateAccountModal');
    } else if (!get(this, 'isLoading')) {
      set(this, 'isLoading', true);
      const subscription = get(this, 'subscription');
      if (subscription) {
        this._toggleSubscriptionState(subscription);
      } else {
        this._createSubscription();
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
    }).save()
      .then(savedSubscription => {
        setProperties(this, {
          'subscription': savedSubscription,
          'isLoading': false
        });
      }).catch(err => {
        set(this, 'isLoading', false);
        Logger.error(err);
      });
  },

  _toggleSubscriptionState(subscription) {
    subscription.toggleProperty('active');
    subscription.save()
      .then(savedSubscription => {
        setProperties(this, {
          'subscription': savedSubscription,
          'isLoading': false
        });
      })
      .catch(err => {
        set(this, 'isLoading', false);
        Logger.error(err);
      });
  }
});

import Ember from 'ember';

const { Component, computed, get, inject: { service }, Logger, set } = Ember;

export default Component.extend({
  tagName: 'button',
  // classNames: ['c-follow-btn'],
  classNameBindings: ['isFollowing:c-follow-btn-active:c-follow-btn'],

  session: service(),
  store: service(),

  isFollowing: computed('subscription', function() {
    return get(this, 'subscription') ? get(this, 'subscription.active') : false;
  }),

  subscription: computed('subscribable', function() {
    const subscriptions = get(this, 'subscribable.subscriptions') || false;
    if (subscriptions) {
      return subscriptions.find(subscription => {
        if (subscription.userId === get(this, 'session.authenticatedUser.id')) {
          return true;
        }
      });
    } else {
      return null;
    }
  }),

  click() {
    set(this, 'loading', true);
    const subscription = get(this, 'subscription');
    if (subscription) {
      subscription.toggleProperty('active');
      subscription.save()
        .then(() => {
          set(this, 'loading', false);
        })
        .catch(err => {
          set(this, 'loading', false);
          Logger.error(err);
        });
    } else {
      this._createSubscription()
        .then(() => {
          set(this, 'loading', false);
        }).catch(err => {
          set(this, 'loading', false);
          Logger.error(err);
        });
    }
  },

  _createSubscription() {
    const currentModel = get(this, 'model'); //can be request or dataset
    const subscribable = get(this, 'store').peekRecord('subscribable', currentModel.id);
    return get(this, 'store').createRecord('subscription', {
      active: true,
      subscribableId: subscribable,
      subscribableModel: currentModel.constructor.modelName,
      userId: get(this, 'session.authenticatedUser')
    }).save();
  }

});

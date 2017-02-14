import Ember from 'ember';

const { Component, computed, get, inject: { service } } = Ember;

export default Component.extend({
  tagName: 'button',
  classNames: ['c-follow-btn'],
  classNameBindings: ['isFollowing:c-follow-btn-active:c-follow-btn-default'],
  session: service(),

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
  })
});

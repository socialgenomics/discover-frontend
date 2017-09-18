import Ember from 'ember';

const { Component, computed, get, inject: { service }, Logger, set } = Ember;

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
    const modelName = currentModel.constructor.modelName;
    const dataObj = {
      active: true,
      subscribableModel: modelName,
      userId: get(this, 'session.authenticatedUser')
    };

    dataObj[modelName + "Id"] = currentModel;

    return get(this, 'store')
      .createRecord('subscription', dataObj)
      .save()
      .then(subscription => set(this, 'subscription', subscription))
      .catch(Logger.error)
      .finally(() => { set(this, 'isLoading', false); });
  },

  _toggleSubscriptionState(subscription) {
    subscription.toggleProperty('active');
    subscription
      .save()
      .catch(Logger.error)
      .finally(() => { set(this, 'isLoading', false); });
  }
});

import Ember from 'ember';
import { createActionData } from 'repositive/utils/actions';
import { getSubscriptions } from 'repositive/utils/subscriptions';

const { Mixin, get, Logger } = Ember;

export default Mixin.create({
  actions: {
    addAttribute(model, user, key, value) {
      const store = get(this, 'store');
      store
        .createRecord('action', createActionData(model, user, 'attribute', { properties: { key, value } }))
        .save()
        .then(() => this._reloadSubscriptions(store, model, user))
        .catch(Logger.error);
    },

    addComment(model, user, text) {
      const store = get(this, 'store');
      store
        .createRecord('action', createActionData(model, user, 'comment', { properties: { text } }))
        .save()
        .then(savedComment => {
          get(this, 'comments').insertAt(0, savedComment);
          this._reloadSubscriptions(store, model, user);
        })
        .catch(Logger.error);
    },

    addTag(model, user, text) {
      if (get(this, 'tags').findBy('properties.text', text)) {
        this.flashMessages.add({ message: `The tag: ${text} already exists.`, type: 'warning' });
      } else {
        get(this, 'store')
          .createRecord('action', createActionData(model, user, 'tag', { properties: { text } }))
          .save()
          .catch(Logger.error);
      }
    }
  },

  /**
   * @desc re-fetch subscriptions to update the follow-button
   * @param {DS.Store} store instance of the store
   * @param {DS.Model} model the model whose subscriptions are to be reloaded
   * @param {DS.Model} userId current user
   * @private
   */
  _reloadSubscriptions(store, model, user) {
    const existingSubscription = store.peekAll('subscription').filter(subscription => {
      const userIdMatches = get(subscription, 'userId.id') === get(user, 'id');
      const subscribableIdMatches = get(subscription, 'subscribableId.id') === get(model, 'id');
      return userIdMatches && subscribableIdMatches;
    });
    if (existingSubscription.length === 0) {
      getSubscriptions(store, get(model, 'id'), get(user, 'id'));
    }
  }
});

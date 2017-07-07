import Ember from 'ember'

const { get, Logger } = Ember;
/**
 * @desc fetches subscriptions for a given model and userId
 * @param {DS.Store} store instance of the store
 * @param {String} modelId the id of the model
 * @param {String} userId the id of the user
 * @returns {RSVP.Promise} the promised subscriptions
 * @public
 */
export function getSubscription(store, modelId, userId) {
  return store.query('subscription', {
    'where.subscribable_id': modelId,
    'where.user_id': userId
  })
    .then(subscriptions => {
      return get(subscriptions, 'firstObject');
    }).catch(Logger.error)
}

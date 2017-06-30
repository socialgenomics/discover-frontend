/**
 * @desc fetches subscriptions for a given model and userId
 * @param {DS.Store} store instance of the store
 * @param {String} subscribableId the id of the model
 * @param {String} userId the id of the user
 * @returns {RSVP.Promise} the promised subscriptions
 * @public
 */
export function getSubscriptions(store, subscribableId, userId) {
  return store.query('subscription', {
    'where.subscribable_id': subscribableId,
    'where.user_id': userId
  });
}

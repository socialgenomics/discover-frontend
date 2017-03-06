import Ember from 'ember';

const { Mixin } = Ember;

export default Mixin.create({
  _getSubscriptions(subscribableId, userId) {
    return this.store.query('subscription', {
      'where.subscribable_id': subscribableId,
      'where.user_id': userId
    });
  }
});

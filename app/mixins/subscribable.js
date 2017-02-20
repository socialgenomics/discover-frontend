import Ember from 'ember';

const { Mixin } = Ember;

export default Mixin.create({
  _getSubscriptions(subscribableId) {
    return this.store.query('subscription', {
      'where.subscribable_id': subscribableId
    });
  }
});

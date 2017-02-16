import Ember from 'ember';

const { get, Mixin, Logger } = Ember;

export default Mixin.create({
  _getComments(actionableId) {
    return this.store.query('action', {
      'where.actionable_id': actionableId,
      'where.type': 'comment',
      'order[0][0]': 'updated_at',
      'order[0][1]': 'DESC',
      limit: 100 // Remove limit to 10 elements
    });
  },

  _getSubscriptions(subscribableId) {
    return this.store.query('subscription', {
      'where.subscribable_id': subscribableId
    });
  },

  _getTags(actionableId) {
    return this.store.query('action', {
      'where.actionable_id': actionableId,
      'where.type': 'tag'
    });
  },

  _incrementViewCounter(model, userId) {
    if (model) {
      this.store.createRecord('action', {
        userId: userId || null,
        actionableId: get(model, 'actionableId'),
        type: 'view',
        actionable_model: model.constructor.modelName
      })
      .save().catch(Logger.error);
    }
  },

  _peekOrCreate(store, modelType, id) {
    return store.peekRecord(modelType, id) || store.createRecord(modelType, { id });
  }
});

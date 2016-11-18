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

  _getTags(actionableId) {
    return this.store.query('action', {
      'where.actionable_id': actionableId,
      'where.type': 'tag'
    });
  },

  _incrementViewCounter(model, userId) {
    if (model && userId) {
      this.store.createRecord('action', {
        userId,
        actionableId: get(model, 'actionableId'),
        type: 'view',
        actionable_model: model.constructor.modelName
      })
      .save().catch(Logger.error);
    }
  },

  _peekOrCreate(store, id) {
    return store.peekRecord('actionable', id) || store.createRecord('actionable', { id });
  }
});

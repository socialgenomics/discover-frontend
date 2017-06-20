import Ember from 'ember';

const { get, Mixin, Logger } = Ember;

export default Mixin.create({
  //TODO: refactor this mixin into util functions.
  _getComments(modelId) {
    return this.store.query('action', {
      'where.actionable_id': modelId,
      'where.type': 'comment',
      'order[0][0]': 'updated_at',
      'order[0][1]': 'DESC',
      limit: 100
    });
  },

  _getTags(modelId) {
    return this.store.query('action', {
      'where.actionable_id': modelId,
      'where.type': 'tag',
      limit: 100
    });
  },

  _getAttributes(modelId) {
    return this.store.query('action', {
      'where.actionable_id': modelId,
      'where.type': 'attribute',
      limit: 100
    });
  },

  _incrementViewCounter(model, userId) {
    if (model) {
      this.store.createRecord('action', {
        userId: userId || null,
        actionableId: get(model, 'id'),
        type: 'view',
        actionable_model: model.constructor.modelName
      })
      .save().catch(Logger.error);
    }
  }
});

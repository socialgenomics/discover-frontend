import Ember from 'ember';

const { get, Mixin, Logger } = Ember;

export default Mixin.create({
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

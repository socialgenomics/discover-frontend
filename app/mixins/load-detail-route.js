import Ember from 'ember';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';

const { Mixin, get, Logger, RSVP } = Ember;

export default Mixin.create({
  _getStats() {
    return ajax({ url: ENV.APIRoutes['stats'] , type: 'GET' });
  },

  _getComments(actionableId) {
    return this.store.query('action', {
      'where.actionable_id': actionableId,
      'where.type': 'comment',
      'order[0][0]': 'updated_at',
      'order[0][1]': 'DESC',
      limit: 100 // Remove limit to 10 elements
    });
  },

  _getModelData(params, modelType) {
    const modelId = params.id;
    return RSVP.hash({
      actionable: this._peekOrCreate(this.store, modelId),
      comments: this._getComments(modelId),
      tags: this._getTags(modelId),
      model: this.store.findRecord(modelType, modelId)
    })
    .then(data => {
      const model = data.model;
      const commenterIds = data.comments.content
      .map(action => get(action, 'record.userId.id'))
      .uniq(); //removes duplicates
      model.set('actionableId', data.actionable);
      return RSVP.hash({
        model,
        userProfiles: commenterIds.map(id => this.store.query('userProfile', id))
      });
    });
  },

  _getTags(actionableId) {
    return this.store.query('action', {
      'where.actionable_id': actionableId,
      'where.type': 'tag'
    });
  },

  _incrementViewCounter(model) {
    const userId = get(this, 'session.authenticatedUser');
    if (userId) {
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

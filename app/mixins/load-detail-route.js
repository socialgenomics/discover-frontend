import Ember from 'ember';
import ENV from 'repositive/config/environment';
import ActionableMixin from 'repositive/mixins/actionable';

const { Mixin, get, RSVP, inject: { service }, setProperties } = Ember;

export default Mixin.create(ActionableMixin, {
  ajax: service(),

  _getStats() {
    return get(this, 'ajax').request(ENV.APIRoutes['stats'], { method: 'GET' });
  },
  _getModelData(params, modelType) {
    const modelId = params.id;
    return RSVP.hash({
      actionable: this._peekOrCreate(this.store, 'actionable', modelId),
      subscibable: this._peekOrCreate(this.store, 'subscribable', modelId),
      comments: this._getComments(modelId),
      tags: this._getTags(modelId),
      model: this.store.findRecord(modelType, modelId)
    })
      .then(data => {
        const model = data.model;
        const commenterIds = data.comments.content
          .map(action => get(action, 'record.userId.id'))
          .uniq(); //removes duplicates
        setProperties(model, {
          'actionableId': data.actionable,
          'subscribableId': data.subscribable
        });
        return RSVP.hash({
          model,
          userProfiles: commenterIds.map(id => this.store.query('userProfile', id))
        });
      });
  }
});

import Ember from 'ember';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';
import ActionableMixin from 'repositive/mixins/actionable';

const { Mixin, get, RSVP } = Ember;

export default Mixin.create(ActionableMixin, {
  _getStats() {
    return ajax({ url: ENV.APIRoutes['stats'] , type: 'GET' });
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
  }
});

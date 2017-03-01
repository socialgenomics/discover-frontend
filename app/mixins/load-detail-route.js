import Ember from 'ember';
import ENV from 'repositive/config/environment';
import ActionableMixin from 'repositive/mixins/actionable';
import SubscribableMixin from 'repositive/mixins/subscribable';
import peekOrCreate from '../utils/peekOrCreate';

const { Mixin, get, RSVP, inject: { service }, setProperties } = Ember;

export default Mixin.create(ActionableMixin, SubscribableMixin, {
  ajax: service(),
  session: service(),

  _getStats() {
    return get(this, 'ajax').request(ENV.APIRoutes['stats'], { method: 'GET' });
  },

  _getModelData(params, modelType) {
    const modelId = params.id;
    return RSVP.hash({
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
          'actionableId': peekOrCreate(this.store, 'actionable', modelId),
          'subscribableId': peekOrCreate(this.store, 'subscribable', modelId)
        });
        const hashObj = {
          model,
          tags: data.tags,
          userProfiles: commenterIds.map(id => this.store.query('userProfile', id))
        };
        if (get(this, 'session.isAuthenticated')) {
          hashObj['subscriptions'] = this._getSubscriptions(modelId, get(this, 'session.authenticatedUser.id'));
        }
        return RSVP.hash(hashObj);
      });
  }
});

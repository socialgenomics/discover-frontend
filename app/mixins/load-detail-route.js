import Ember from 'ember';
import ENV from 'repositive/config/environment';
import ActionableMixin from 'repositive/mixins/actionable';
import SubscribableMixin from 'repositive/mixins/subscribable';
import colours from 'repositive/utils/colours';

const { Mixin, get, RSVP, inject: { service }, setProperties } = Ember;

export default Mixin.create(ActionableMixin, SubscribableMixin, {
  ajax: service(),
  session: service(),

  _getStats() {
    return get(this, 'ajax').request(ENV.APIRoutes['stats'], { method: 'GET' });
  },

  _getModelData(params, modelType) {
    const modelId = params.id;
    const initialDataHash = {
      comments: this._getComments(modelId),
      tags: this._getTags(modelId),
      model: this.store.findRecord(modelType, modelId)
    };
    if (get(this, 'session.isAuthenticated')) {
      initialDataHash['actionable'] = this.store.findRecord('actionable', modelId);
      initialDataHash['subscribable'] = this.store.findRecord('subscribable', modelId);
    }
    return RSVP.hash(initialDataHash)
      .then(data => {
        const model = data.model;
        const commenterIds = data.comments.content
          .map(action => get(action, 'record.userId.id'))
          .uniq(); //removes duplicates
        set(model, 'colour', colours.getColour(get(model, 'assay')));
        if (get(this, 'session.isAuthenticated')) {
          setProperties(model, {
            'actionableId': data.actionable,
            'subscribableId': data.subscribable
          });
        }
        const hashObj = {
          model,
          tags: data.tags,
          userProfiles: commenterIds.map(id => this.store.query('userProfile', id))
        };
        if (get(this, 'session.isAuthenticated')) {
          hashObj['subscriptions'] = this._getSubscriptions(modelId);
        }
        return RSVP.hash(hashObj);
      });
  }
});

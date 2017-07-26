import Ember from 'ember';
import ENV from 'repositive/config/environment';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import { buildActionsQuery } from 'repositive/utils/actions';
import { getSubscription } from 'repositive/utils/subscriptions';

const { Mixin, get, RSVP, inject: { service }, set, Logger } = Ember;

export default Mixin.create(FlashMessageMixin, {
  ajax: service(),
  session: service(),

  _getStats() {
    return get(this, 'ajax').request(ENV.APIRoutes['stats'], { method: 'GET' });
  },

  _getModelData(params, modelType) {
    const modelId = params.id;
    return RSVP.hash({
      comments: this.store.query('action', buildActionsQuery({type: 'comment', modelId})),
      tags: this.store.query('action', buildActionsQuery({type: 'tag', modelId})),
      model: this.store.findRecord(modelType, modelId)
    })
      .then(data => {
        const model = data.model;
        const hashObj = {
          model,
          comments: data.comments,
          tags: data.tags
        };
        if (get(this, 'session.isAuthenticated')) {
          hashObj['subscription'] = getSubscription(this.store, modelId, get(this, 'session.authenticatedUser.id'));
        }
        return RSVP.hash(hashObj);
      });
  },

  _checkIfShouldUnfollow(params, transition, modelName) {
    if (transition.queryParams.unfollow) {
      getSubscription(this.store, params.id, get(this, 'session.session.authenticated.user.id'))
        .then(subscription => {
          set(subscription, 'active', false);
          return subscription.save();
        })
        .then(this._addFlashMessage(`You have successfully unfollowed this ${modelName}.`, 'success'))
        .catch(error => {
          Logger.error(error);
          this._addFlashMessage(`There was a problem unfollowing this ${modelName}, please try again.`, 'warning');
        });
    }
  }
});

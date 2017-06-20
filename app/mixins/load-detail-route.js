import Ember from 'ember';
import ENV from 'repositive/config/environment';
import ActionableMixin from 'repositive/mixins/actionable';
import SubscribableMixin from 'repositive/mixins/subscribable';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';

const { Mixin, get, RSVP, inject: { service }, setProperties, set, Logger } = Ember;

export default Mixin.create(ActionableMixin, SubscribableMixin, FlashMessageMixin, {
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
      model: this.store.findRecord(modelType, modelId),
      subscribable: this.store.findRecord('subscribable', modelId)
    })
      .then(data => {
        const model = data.model;

        setProperties(model, {
          'subscribableId': data.subscribable
        });
        const hashObj = {
          model,
          tags: data.tags
        };
        if (get(this, 'session.isAuthenticated')) {
          hashObj['subscriptions'] = this._getSubscriptions(this.store, modelId, get(this, 'session.authenticatedUser.id'));
        }
        return RSVP.hash(hashObj);
      });
  },

  _checkIfShouldUnfollow(params, transition, modelName) {
    if (transition.queryParams.unfollow) {
      this._getSubscriptions(this.store, params.id, get(this, 'session.session.authenticated.user.id'))
        .then(subscriptions => {
          const subscription = subscriptions.get('firstObject');
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

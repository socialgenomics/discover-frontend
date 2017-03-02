import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import LoadDetailRouteMixin from 'repositive/mixins/load-detail-route';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';

const { inject: { service }, Logger, Route, RSVP, get, set } = Ember;

export default Route.extend(AuthenticatedRouteMixin, LoadDetailRouteMixin, FlashMessageMixin, {
  session: service(),

  model(params, transition) {
    if (transition.queryParams.unfollow) {
      const userId = get(this, 'session.authenticatedUser.id');
      return this.store.query('subscription', {
        'where.user_id': userId,
        'where.subscribable_id': params.id
      })
        .then(subscription => {
          set(subscription, 'active', false);
          return subscription.save();
        })
          .then(this.transitionTo('root'))
          .then(this._addFlashMessage('You have successfully unfollowed this request.', 'success'))
          .catch(error => {
            Logger.error(error);
            this._addFlashMessage('There was a problem unfollowing this request, please try again.', 'warning');
          });
    }
    return this._getModelData(params, 'request')
    .then(data => {
      return RSVP.hash({
        request: data.model
      });
    })
    .catch(Logger.error);
  },

  afterModel(model) {
    this._incrementViewCounter(model.request, get(this, 'session.authenticatedUser'));
  },

  actions: {
    didTransition: function() {
      get(this, 'metrics').trackPage();
      return true;
    }
  }
});

import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import LoadDetailRouteMixin from 'repositive/mixins/load-detail-route';
import { incrementViewCounter } from 'repositive/utils/actions';

const { inject: { service }, Logger, Route, RSVP, get, setProperties } = Ember;

export default Route.extend(AuthenticatedRouteMixin, LoadDetailRouteMixin, {
  session: service(),

  model(params, transition) {
    this._checkIfShouldUnfollow(params, transition, 'request');
    return this._getModelData(params, 'request')
      .then(data => {
        return RSVP.hash({
          comments: data.comments,
          tags: data.tags,
          request: data.model
        });
      })
      .catch(Logger.error);
  },

  afterModel(model) {
    incrementViewCounter(this.store, model.request, get(this, 'session.authenticatedUser'));
  },

  setupController(controller, model) {
    this._super(...arguments);
    const sortedComments = model.comments
      .toArray()
      .sortBy('createdAt')
      .reverseObjects();
    const tags = get(model, 'tags').toArray();

    setProperties(controller, {
      'comments': sortedComments,
      tags
    })
  },

  actions: {
    didTransition: function() {
      get(this, 'metrics').trackPage();
      return true;
    }
  }
});

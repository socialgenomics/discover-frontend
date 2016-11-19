import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import LoadDetailRouteMixin from 'repositive/mixins/load-detail-route';

const { inject: { service }, Logger, Route, RSVP, get } = Ember;

export default Route.extend(AuthenticatedRouteMixin, LoadDetailRouteMixin, {
  session: service(),

  model(params) {
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

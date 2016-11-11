import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import LoadDetailRouteMixin from 'repositive/mixins/load-detail-route';

const { inject: { service }, Logger, Route, RSVP, get } = Ember;

export default Route.extend(AuthenticatedRouteMixin, LoadDetailRouteMixin, {
  session: service(),

  model(params) {
    const requestId = params.id;
    const actionable = this._peekOrCreate(this.store, requestId);
    return RSVP.hash({
      comments: this._getComments(requestId),
      tags: this._getTags(requestId),
      request: this.store.findRecord('request', requestId)
    })
    .then(data => {
      const request = data.request;
      const commenterIds = data.comments.content
      .map(action => get(action, 'record.userId.id'))
      .reduce(this._removeDuplicates, []);
      request.set('actionableId', actionable);

      return RSVP.hash({
        userProfiles: commenterIds.map(id => this.store.query('userProfile', id)),
        request: request
      });
    })
    .catch(Logger.error);
  },

  afterModel(model) {
    this._logPageView(model.request);
  },

  actions: {
    didTransition: function() {
      get(this, 'metrics').trackPage();
      return true;
    }
  }
});

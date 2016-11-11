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
    .then(data =>  data.request)
    .catch(Logger.error);
  },

  afterModel(request) {
    //TODO: Refactor - This code is used in several places e.g. request and dataset detail controllers & routes
    const userId = get(this, 'session.authenticatedUser');
    const currentModel = request;
    let view = this.store.createRecord('action', {
      actionableId: get(currentModel, 'actionableId'),
      userId: userId,
      type: 'view',
      actionable_model: currentModel.constructor.modelName
    });
    view.save()
    .catch(Logger.error);
  },

  actions: {
    didTransition: function() {
      get(this, 'metrics').trackPage();
      return true;
    }
  }
});

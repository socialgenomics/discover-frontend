import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { inject: { service }, Logger, Route, RSVP, get } = Ember;

//TODO move into mixin?
function peekOrCreate(store, id) {
  return store.peekRecord('actionable', id) || store.createRecord('actionable', { id });
}
//This returns a list of user_ids, no duplicates.
function removeDuplicates(acc, curr) {
  if (acc.indexOf(curr) === -1) {
    acc.push({ 'where.user_id': curr });
  }
  return acc;
}

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),

  model(params) {
    const requestId = params.id;
    const actionable = peekOrCreate(this.store, requestId);
    return RSVP.hash({
      comments: this._getComments(requestId),
      tags: this._getTags(requestId),
      request: this.store.findRecord('request', requestId)
    })
    .then(data => {
      const request = data.request;
      const commenterIds = data.comments.content
      .map(action => get(action, 'record.userId.id'))
      .reduce(removeDuplicates, []);
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
  },
  _getComments(actionableId) {
    return this.store.query('action', {
      'where.actionable_id': actionableId,
      'where.type': 'comment',
      'order[0][0]': 'updated_at',
      'order[0][1]': 'DESC',
      limit: 100 // Remove limit to 10 elements
    });
  },
  _getTags(actionableId) {
    return this.store.query('action', {
      'where.actionable_id': actionableId,
      'where.type': 'tag'
    });
  }
});

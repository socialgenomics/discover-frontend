import Ember from 'ember';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';
import ResetScrollMixin from 'repositive/mixins/reset-scroll';

const { inject: { service }, Logger, Route, RSVP, get } = Ember;

//TODO move into mixin?
function peekOrCreate(store, id) {
  return store.peekRecord('actionable', id) || store.createRecord('actionable', { id });
}

//This returns a list of user_ids, no duplicates.
function reducer(acc, curr) {
  if (acc.indexOf(curr) === -1) {
    acc.push({ 'where.user_id': curr });
  }
  return acc;
}

export default Route.extend(ResetScrollMixin, {
  session: service(),
  favouritesService: service('favourites'),

  model(params) {
    const datasetId = params.id;
    const actionable = peekOrCreate(this.store, datasetId);
    return RSVP.hash({
      comments: this._getComments(datasetId),
      tags: this._getTags(datasetId),
      dataset: this.store.findRecord('dataset', datasetId)
    })
    .then(data => {
      const dataset = data.dataset;
      const commenterIds = data.comments.content
      .map(action => get(action, 'record.userId.id'))
      .reduce(reducer, []);
      console.log(commenterIds);
      dataset.set('actionableId', actionable);

      return RSVP.hash({
        dataset,
        userProfiles: commenterIds.map(id => this.store.query('userProfile', id))
      });
    })
    .then(data => {
      return RSVP.hash({
        dataset: data.dataset,
        stats: get(this, 'session.isAuthenticated') === false ? this._getStats() : null
      });
    })
    .catch(Logger.error);
  },

  afterModel(model) {
    //TODO: Refactor - This code is used in several places e.g. request and dataset detail controllers & routes
    const userId = get(this, 'session.authenticatedUser');
    const dataset = model.dataset;
    if (userId) {
      this.store.createRecord('action', {
        userId,
        actionableId: get(dataset, 'actionableId'),
        type: 'view',
        actionable_model: dataset.constructor.modelName
      })
      .save()
      .catch(Logger.error);
    }
  },

  actions: {
    didTransition() {
      get(this, 'metrics').trackPage();
      return true;
    }
  },

  _getStats() {
    return ajax({ url: ENV.APIRoutes['stats'] , type: 'GET' });
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

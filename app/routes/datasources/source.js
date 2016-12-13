import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ENV from 'repositive/config/environment';
import ResetScrollMixin from 'repositive/mixins/reset-scroll';
import ActionableMixin from 'repositive/mixins/actionable';
import SearchRouteMixin from '../../mixins/search-route';

const { get, Route, RSVP, inject: { service }, Logger, set, assign } = Ember;

const storeDatasets = (store) => (datasets) => datasets.map(dataset => store.push(store.normalize('dataset', dataset)));

export function model(params) {
  const store = this.store;
  const collectionId = params.id;
  const limit = params.limit;
  const offset = limit * (params.page - 1);
  const datasetsUrl = ENV.APIRoutes['collection-datasets'].replace('{collection_id}', collectionId) + `?limit=${params.limit}&offset=${offset}`;
  return RSVP.hash({
    actionable: this._peekOrCreate(store, collectionId),
    collection: store.findRecord('collection', collectionId),
    collectionStats: get(this, 'ajax').request(ENV.APIRoutes['collection-stats'].replace('{collection_id}', collectionId), { method: 'GET' })
  })
    .then(data => {
      return get(this, 'searchService').updateQueryAndMakeRequest(`collection:${collectionId}`, params.page || 0)
      .then(m => {
        const model = assign(data, m);
        set(model, 'collection.actionableId', model.actionable);
        return model
      });
    }).catch(Logger.error);
}

export default Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, ActionableMixin, SearchRouteMixin, {
  session: service(),
  ajax: service(),
  searchService: service('search'),
  controllerName: 'collection',
  model: model,
  afterModel(model) {
    this._incrementViewCounter(model.collection, get(this, 'session.authenticatedUser'));
  },
  resetController(controller, isExiting) {
    if (isExiting) {
      set(controller, 'page', 1);
    }
  },
  actions: {

    invalidateModel: function() {
      this.controller.set('isLoading', true);
      this.refresh().promise.then(() => this.controller.set('isLoading', false));
    }
  }
});

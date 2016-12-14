import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ENV from 'repositive/config/environment';
import ResetScrollMixin from 'repositive/mixins/reset-scroll';
import ActionableMixin from 'repositive/mixins/actionable';
import SearchRouteMixin from '../../mixins/search-route';

const { get, Route, RSVP, inject: { service }, Logger, set, assign } = Ember;

export function model(params) {
  const searchService = get(this, 'searchService');
  const store = this.store;
  const collectionId = params.id;
  // const limit = params.limit;
  return RSVP.hash({
    actionable: this._peekOrCreate(store, collectionId),
    collection: store.findRecord('collection', collectionId),
    collectionStats: get(this, 'ajax').request(ENV.APIRoutes['collection-stats'].replace('{collection_id}', collectionId), { method: 'GET' })
  })
    .then(hash => {
      const queryTree = searchService.updateQuery(
        searchService.addFilter('collection', collectionId),
        params.page
      );
      return RSVP.hash({
        data: hash,
        searchResults: searchService.makeRequest(queryTree)
      });
    })
      .then(dataAndResults => {
        const model = assign(dataAndResults.data, dataAndResults.searchResults);
        set(model, 'collection.actionableId', model.actionable);
        return model;
      })
      .catch(Logger.error);
}

export default Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, ActionableMixin, SearchRouteMixin, {
  ajax: service(),
  session: service(),
  searchService: service('search'),

  controllerName: 'collection',
  model: model,
  afterModel(model) {
    this._incrementViewCounter(model.collection, get(this, 'session.authenticatedUser'));
  }
});

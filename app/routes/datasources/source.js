import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ENV from 'repositive/config/environment';
import ResetScrollMixin from 'repositive/mixins/reset-scroll';
import ActionableMixin from 'repositive/mixins/actionable';
import SearchRouteMixin from '../../mixins/search';

const { get, Route, RSVP, inject: { service }, Logger, set, assign } = Ember;

function doQuery(data, queryString) {
  // Return query if it already exists and includes datasource/collection name
  if (queryString) {
    if (queryString.includes('datasource') || queryString.includes('collection')) {
      return queryString;
    }
  }
  const name = get(data.collection, 'name');
  // Put name in quotes if it has spaces
  const normalisedName = /\s+/.test(name) ? `"${name}"` : name;
  const short_name = get(data.collection, 'properties.short_name');
  const type = get(data.collection, 'type') === 'datasource' ? 'datasource' : 'collection';
  const predicateToAppend = `${type}:${short_name || normalisedName}`;
  return queryString ? `${predicateToAppend} ${queryString}` : `${predicateToAppend}`;
}

export function model(params) {
  const store = this.store;
  const collectionId = params.id;
  const queryString = params.query;
  return RSVP.hash({
    actionable: this._peekOrCreate(store, collectionId),
    collection: store.findRecord('collection', collectionId),
    collectionStats: get(this, 'ajax').request(ENV.APIRoutes['collection-stats'].replace('{collection_id}', collectionId), { method: 'GET' })
  })
    .then(data => {
      const updatedQuery = doQuery(data, queryString);
      set(params, 'query', updatedQuery);
      return this.makeRequest(params)
      .then(m => {
        const model = assign(data, m);
        set(model, 'collection.actionableId', model.actionable);
        return model;
      });
    }).catch(Logger.error);
}

export default Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, ActionableMixin, SearchRouteMixin, {
  ajax: service(),
  session: service(),

  controllerName: 'collection',
  model: model,
  afterModel(model) {
    this._incrementViewCounter(model.collection, get(this, 'session.authenticatedUser'));
  }
});

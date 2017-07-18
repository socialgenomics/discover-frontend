import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ENV from 'repositive/config/environment';
import ResetScrollMixin from 'repositive/mixins/reset-scroll';
import SearchRouteMixin from 'repositive/mixins/search';
import IncrementCollectionViewCounterMixin from 'repositive/mixins/increment-collection-view-counter-mixin';

const { get, Route, RSVP, inject: { service }, Logger, set, assign } = Ember;

function doQuery(data, queryString) {
  const name = get(data.collection, 'name');
  // Put name in quotes if it has spaces
  const normalisedName = /\s+/.test(name) ? `"${name}"` : name;
  const short_name = get(data.collection, 'properties.short_name');
  //Check if collection name has already been appended to queryString
  if (queryString) {
    if (queryString.includes(short_name) || queryString.includes(normalisedName)) {
      return queryString;
    }
  }
  const type = _getType(get(data, 'collection.type'));
  const predicateToAppend = `${type}:${short_name || normalisedName}`;
  return queryString ? `${predicateToAppend} ${queryString}` : `${predicateToAppend}`;
}

function _getType(type) {
  if (type === 'datasource' || type === 'personal_repository') {
    return 'datasource';
  } else { return 'collection' }
}

export function model(params) {
  const store = this.store;
  const collectionId = params.id;
  const queryString = params.query;
  return RSVP.hash({
    collection: store.findRecord('collection', collectionId),
    collectionStats: get(this, 'ajax').request(ENV.APIRoutes['collection-stats'].replace('{collection_id}', collectionId), { method: 'GET' })
  })
    .then(data => {
      const updatedQuery = doQuery(data, queryString);
      set(params, 'query', updatedQuery);
      return this.makeRequest(params)
        .then(m => {
          const model = assign(data, m);
          this._updateQueryServiceValue(params.query);
          return model;
        });
    }).catch(Logger.error);
}

export default Route.extend(
  AuthenticatedRouteMixin,
  ResetScrollMixin,
  SearchRouteMixin,
  IncrementCollectionViewCounterMixin,
  {
    ajax: service(),
    session: service(),

    controllerName: 'collection',

    model: model,
    afterModel(model) {
      this.incrementCollectionsViewCounter(model);
    }
  }
);

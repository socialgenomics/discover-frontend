import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';
import ResetScrollMixin from 'repositive/mixins/reset-scroll';

const storeDatasets = (store) => (datasets) => datasets.map(dataset => store.push(store.normalize('dataset', dataset)));

export function model(params) {
  const token = this.get('session.session.content.authenticated.token');
  const authHeaders = {
    authorization: `JWT ${token}`
  };

  const store = this.store;

  const collectionId = params.id;
  const limit = params.limit;
  const offset = limit * (params.page - 1);
  const datasetsUrl = ENV.APIRoutes['collection-datasets'].replace('{collection_id}', collectionId) + `?limit=${params.limit}&offset=${offset}`;

  return new Ember.RSVP.hash({
    collection: store.findRecord('collection', collectionId),
    collectionStats: ajax({
      url: ENV.APIRoutes['collection-stats'].replace('{collection_id}', collectionId),
      type: 'GET',
      headers: authHeaders
    }),
    datasets: ajax({
      url: datasetsUrl,
      type: 'GET',
      headers: authHeaders
    }).then(storeDatasets(store))
  });
}

export default Ember.Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, {
  controllerName: 'collection',
  model: model,

  actions: {
    invalidateModel: function() {
      this.controller.set('isLoading', true);
      this.refresh().promise.then(() => this.controller.set('isLoading', false));
    }
  }
});

import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';

export function model(params) {
  let token = this.get('session.session.content.authenticated.token');
  let authHeaders = {
    authorization: `JWT ${token}`
  };

  return this.store.findRecord('collection', params.id)
  .then(collection => {
    const collectionId = collection.get('id');
    return new Ember.RSVP.hash({
      collection: collection,
      collectionStats: ajax({
        url: ENV.APIRoutes['collection-stats'].replace('{collection_id}', collectionId),
        type: 'GET',
        headers: authHeaders
      }),
      datasets: ajax({
        url: ENV.APIRoutes['collection-datasets'].replace('{collection_id}', collectionId),
        type: 'GET',
        headers: authHeaders
      })
    });
  })
  .catch(err => {
    Ember.Logger.error(err);
  });
}

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  controllerName: 'collection',
  model: model,

  setupController(controller, models) {
    this._super(controller, models);
    controller.set('isLoading', false);
  },
  actions: {
    invalidateModel: function() {
      this.controller.set('isLoading', true);
      this.refresh().promise.then(() => this.controller.set('isLoading', false));
    }
  }
});

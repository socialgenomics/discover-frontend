import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';
import attr from 'ember-data/attr';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  
  model: function(params) {

    let token = this.get('session.session.content.authenticated.token');
    let authHeaders = {
      authorization: `JWT ${token}`
    };

    return this.store.findRecord('collection', params.id)
    .then(source => {
      const collectionId = source.get('id');
      return new Ember.RSVP.hash({
        source: source,
        collectionStats: ajax({
          url: ENV.APIRoutes['collection-stats'].replace('{collection_id}', collectionId),
          type: 'GET',
          headers: authHeaders
        }),
        datasets: this.store.query('dataset', {
          'include[0][model]': 'dataset_collection',
          'include[0][where][collection_id]': collectionId,
          'include[0][required]': true,
          'offset': params.limit * (params.page - 1),
          'limit': params.limit,
          'order[0][0]': 'updated_at',
          'order[0][1]': 'DESC'
        })
      });
    })
    .catch(err => {
      Ember.Logger.error(err);
    });
  },

  setupController(controller, models) {
    this._super(controller, models);
    this.controller = controller;
    controller.set('isLoading', false);
  },
  actions: {
    invalidateModel: function() {
      this.controller.set('isLoading', true);
      this.refresh().promise.then(() => this.controller.set('isLoading', false));
    }
  }
});

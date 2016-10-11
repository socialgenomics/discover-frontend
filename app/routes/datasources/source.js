import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    let token = this.get('session.session.content.authenticated.token');
    let authHeaders = {
      authorization: `JWT ${token}`
    };

    return this.store.findRecord('collection', params.id)
    .then(source => {
      const sourceId = source.get('id');
      return new Ember.RSVP.hash({
        source: source,
        collectionStats: ajax({
          url: ENV.APIRoutes['collection-stats'].replace('{collection_id}', sourceId),
          type: 'GET',
          headers: authHeaders
        }),
        datasets: this.store.query('dataset', {
           'where.datasource_id': sourceId,
           'offset': 0,
           'limit': 9
         })
      });
    })
    .catch(err => {
      Ember.Logger.error(err);
    });
  },
  setupController(controller, models) {
    this._super(controller, models);
    controller.set('collectionStats', models.collectionStats);
  }
});

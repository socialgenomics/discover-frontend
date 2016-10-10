import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    return this.store.findRecord('collection', params.id)
    .then(source => {
      const sourceId = source.get('id');
      return new Ember.RSVP.hash({
        source: source,
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
  }
});

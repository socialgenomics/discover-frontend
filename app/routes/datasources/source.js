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
           'datasource_id': sourceId
         })
      });
    })
    .then(values => {
      return {
        source: values.source,
        datasets: values.datasets
      };
    })
    .catch(err => {
      Ember.Logger.error(err);
    });
  }
});

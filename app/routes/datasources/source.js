import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    return this.store.findRecord('datasource', params.id)
    .then(source => {
      const sourceId = source.get('id');
      return new Ember.RSVP.all([
        source,
        this.store.query('dataset', { 'source_id': sourceId })
      ]);
    })
    .then(values => {
      return {
        source: values[0],
        datasets: values[1]
      };
    })
    .catch(err => {
      Ember.Logger.error(err);
    });
  }
});

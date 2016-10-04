import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    return this.store.findRecord('collection', params.id)
    .then(collection => {
      const collectionID = collection.get('id');
      return new Ember.RSVP.all([
        collection,
        this.store.query('collection', { 'collection_id': collectionID })
      ]);
    })
    .then(values => {
      return {
        collection: values[0],
        datasets: values[1]
      };
    })
    .catch(err => {
      Ember.Logger.error(err);
    });
  }
});
